from django.db import models


class Person(models.Model):
    firstName = models.CharField(max_length=100, null=False, blank=True)
    middleName = models.CharField(max_length=100, null=True, blank=True)
    lastName = models.CharField(max_length=100, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    jobtitle = models.CharField(max_length=100, null=True, blank=True)
    company = models.ForeignKey(
        "Company", on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return str(self.firstName)

    class Meta:
        verbose_name_plural = "Person"


class Company(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    website = models.CharField(max_length=100, null=True, blank=True)
    revenue = models.CharField(max_length=100, null=True, blank=True)
    revenueRange = models.CharField(max_length=100, null=True, blank=True)
    employeeCount = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name_plural = "Company"


class Education(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, blank=True, null=True)
    school = models.CharField(max_length=100, null=True, blank=True)
    educationDegree = models.CharField(max_length=100, null=True, blank=True)
    areaOfStudy = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return str(self.school)

    class Meta:
        verbose_name_plural = "Education"


class SocialMedia(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, blank=True, null=True)
    type = models.CharField(max_length=100, null=True, blank=True)
    url = models.URLField(null=True, blank=True)

    def __str__(self):
        return str(self.type)

    class Meta:
        verbose_name_plural = "SocialMedia"
