from django.db import models

from modelcluster.fields import ParentalKey
from django.utils.translation import gettext as _
from wagtail.models import Page, Orderable
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.search import index

from django.contrib import messages
from django.db import models
from django.shortcuts import redirect, render
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from taggit.models import Tag, TaggedItemBase
from wagtail.admin.panels import FieldPanel, MultipleChooserPanel
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from wagtail.fields import StreamField
from wagtail.models import Orderable, Page
from wagtail.search import index
from modelcluster.models import ClusterableModel

from wagtail.models import (
    DraftStateMixin,
    LockableMixin,
    Page,
    PreviewableMixin,
    RevisionMixin,
    WorkflowMixin,
)

from wagtail.admin.panels import (
    FieldPanel,
    FieldRowPanel,
    MultiFieldPanel,
    PublishingPanel,
)
from wagtail.search import index

from .blocks import BaseStreamBlock

from .blocks import BaseStreamBlock


from wagtail.snippets.models import register_snippet

@register_snippet
class Person(
    WorkflowMixin,
    DraftStateMixin,
    LockableMixin,
    RevisionMixin,
    PreviewableMixin,
    index.Indexed,
    ClusterableModel,
):
    """
    A Django model to store Person objects.
    It is registered using `register_snippet` as a function in wagtail_hooks.py
    to allow it to have a menu item within a custom menu item group.

    `Person` uses the `ClusterableModel`, which allows the relationship with
    another model to be stored locally to the 'parent' model (e.g. a PageModel)
    until the parent is explicitly saved. This allows the editor to use the
    'Preview' button, to preview the content, without saving the relationships
    to the database.
    https://github.com/wagtail/django-modelcluster
    """

    first_name = models.CharField("First name", max_length=254)
    last_name = models.CharField("Last name", max_length=254)
    job_title = models.CharField("Job title", max_length=254)

    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    panels = [
        MultiFieldPanel(
            [
                FieldRowPanel(
                    [
                        FieldPanel("first_name"),
                        FieldPanel("last_name"),
                    ]
                )
            ],
            "Name",
        ),
        FieldPanel("job_title"),
        FieldPanel("image"),
        PublishingPanel(),
    ]

    search_fields = [
        index.SearchField("first_name"),
        index.SearchField("last_name"),
        index.FilterField("job_title"),
        index.AutocompleteField("first_name"),
        index.AutocompleteField("last_name"),
    ]

    @property
    def thumb_image(self):
        # Returns an empty string if there is no profile pic or the rendition
        # file can't be found.
        try:
            return self.image.get_rendition("fill-50x50").img_tag()
        except:  # noqa: E722 FIXME: remove bare 'except:'
            return ""

    @property
    def preview_modes(self):
        return PreviewableMixin.DEFAULT_PREVIEW_MODES + [("blog_post", _("Blog post"))]

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)

    def get_preview_template(self, request, mode_name):

        if mode_name == "blog_post":
            return BlogPage.template
        return "base/preview/person.html"

    def get_preview_context(self, request, mode_name):

        context = super().get_preview_context(request, mode_name)
        if mode_name == self.default_preview_mode:
            return context

        page = BlogPage.objects.filter(blog_person_relationship__person=self).first()
        if page:
            # Use the page authored by this person if available,
            # and replace the instance from the database with the edited instance
            page.authors = [
                self if author.pk == self.pk else author for author in page.authors()
            ]
            # The authors() method only shows live authors, so make sure the instance
            # is included even if it's not live as this is just a preview
            if not self.live:
                page.authors.append(self)
        else:
            # Otherwise, get the first page and simulate the person as the author
            page = BlogPage.objects.first()
            page.authors = [self]

        context["page"] = page
        return context

    class Meta:
        verbose_name = "Person"
        verbose_name_plural = "People"


@register_snippet
class BlogPersonRelationship(Orderable, models.Model):
    """
    This defines the relationship between the `Person` within the `base`
    app and the BlogPage below. This allows people to be added to a BlogPage.

    We have created a two way relationship between BlogPage and Person using
    the ParentalKey and ForeignKey
    """

    page = ParentalKey(
        "BlogPage", related_name="blog_person_relationship", on_delete=models.CASCADE
    )
    person = models.ForeignKey(
        "Person", related_name="person_blog_relationship", on_delete=models.CASCADE
    )
    panels = [FieldPanel("person")]

class BlogPageTag(TaggedItemBase):
    """
    This model allows us to create a many-to-many relationship between
    the BlogPage object and tags. There's a longer guide on using it at
    https://docs.wagtail.org/en/stable/reference/pages/model_recipes.html#tagging
    """

    content_object = ParentalKey(
        "BlogPage", related_name="tagged_items", on_delete=models.CASCADE
    )


class BlogPage(Page):

    # Database fields

    introduction = models.TextField(help_text="Text to describe the page", blank=True)
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Landscape mode only; horizontal width between 1000px and 3000px.",
    )
    body = StreamField(
        BaseStreamBlock(), verbose_name="Page body", blank=True, use_json_field=True
    )
    subtitle = models.CharField(blank=True, max_length=255)
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    date_published = models.DateField("Date article published", blank=True, null=True)

    content_panels = Page.content_panels + [
        FieldPanel("subtitle"),
        FieldPanel("introduction"),
        FieldPanel("image"),
        FieldPanel("body"),
        FieldPanel("date_published"),
        MultipleChooserPanel(
            "blog_person_relationship",
            chooser_field_name="person",
            heading="Authors",
            label="Author",
            panels=None,
            min_num=1,
        ),
        FieldPanel("tags"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField("body"),
    ]

    def authors(self):
        """
        Returns the BlogPage's related people. Again note that we are using
        the ParentalKey's related_name from the BlogPersonRelationship model
        to access these objects. This allows us to access the Person objects
        with a loop on the template. If we tried to access the blog_person_
        relationship directly we'd print `blog.BlogPersonRelationship.None`
        """
        # Only return authors that are not in draft
        return [
            n.person
            for n in self.blog_person_relationship.filter(
                person__live=True
            ).select_related("person")
        ]

    @property
    def get_tags(self):
        """
        Similar to the authors function above we're returning all the tags that
        are related to the blog post into a list we can access on the template.
        We're additionally adding a URL to access BlogPage objects with that tag
        """
        tags = self.tags.all()
        base_url = self.get_parent().url
        for tag in tags:
            tag.url = f"{base_url}tags/{tag.slug}/"
        return tags

    # Specifies parent to BlogPage as being BlogIndexPages
    parent_page_types = ["BlogIndexPage"]

    # Specifies what content types can exist as children of BlogPage.
    # Empty list means that no child content types are allowed.
    subpage_types = []



class BlogPageRelatedLink(Orderable):
    page = ParentalKey(BlogPage, on_delete=models.CASCADE, related_name='related_links')
    name = models.CharField(max_length=255)
    url = models.URLField()

    panels = [
        FieldPanel('name'),
        FieldPanel('url'),
    ]


class BlogIndexPage(RoutablePageMixin, Page):
    """
    Index page for blogs.
    We need to alter the page model's context to return the child page objects,
    the BlogPage objects, so that it works as an index page

    RoutablePageMixin is used to allow for a custom sub-URL for the tag views
    defined above.
    """

    introduction = models.TextField(help_text="Text to describe the page", blank=True)
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Landscape mode only; horizontal width between 1000px and 3000px.",
    )

    content_panels = Page.content_panels + [
        FieldPanel("introduction"),
        FieldPanel("image"),
    ]

    # Specifies that only BlogPage objects can live under this index page
    subpage_types = ["BlogPage"]

    # Defines a method to access the children of the page (e.g. BlogPage
    # objects). On the demo site we use this on the HomePage
    def children(self):
        return self.get_children().specific().live()

    # Overrides the context to list all child items, that are live, by the
    # date that they were published
    # https://docs.wagtail.org/en/stable/getting_started/tutorial.html#overriding-context
    def get_context(self, request):
        context = super(BlogIndexPage, self).get_context(request)
        context["posts"] = (
            BlogPage.objects.descendant_of(self).live().order_by("-date_published")
        )
        return context

    # This defines a Custom view that utilizes Tags. This view will return all
    # related BlogPages for a given Tag or redirect back to the BlogIndexPage.
    # More information on RoutablePages is at
    # https://docs.wagtail.org/en/stable/reference/contrib/routablepage.html
    @route(r"^tags/$", name="tag_archive")
    @route(r"^tags/([\w-]+)/$", name="tag_archive")
    def tag_archive(self, request, tag=None):

        try:
            tag = Tag.objects.get(slug=tag)
        except Tag.DoesNotExist:
            if tag:
                msg = 'There are no blog posts tagged with "{}"'.format(tag)
                messages.add_message(request, messages.INFO, msg)
            return redirect(self.url)

        posts = self.get_posts(tag=tag)
        context = {"self": self, "tag": tag, "posts": posts}
        return render(request, "blog/blog_index_page.html", context)

    def serve_preview(self, request, mode_name):
        # Needed for previews to work
        return self.serve(request)

    # Returns the child BlogPage objects for this BlogPageIndex.
    # If a tag is used then it will filter the posts by tag.
    def get_posts(self, tag=None):
        posts = BlogPage.objects.live().descendant_of(self)
        if tag:
            posts = posts.filter(tags=tag)
        return posts

    # Returns the list of Tags for all child posts of this BlogPage.
    def get_child_tags(self):
        tags = []
        for post in self.get_posts():
            # Not tags.append() because we don't want a list of lists
            tags += post.get_tags
        tags = sorted(set(tags))
        return tags