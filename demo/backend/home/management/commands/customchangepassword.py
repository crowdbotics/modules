from django.core.management.base import BaseCommand
from django.core.management import CommandError
from django.contrib.auth import get_user_model
from django.db.models import EmailField


class Command(BaseCommand):
    help = 'Update password of the provided username.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--username', dest='username', default=None,
            help='Specifies the username to be updated.',
        )

        parser.add_argument(
            '--email', dest='email', default=None,
            help='Specifies the email to be updated.',
        )

        parser.add_argument(
            '--password', dest='password', default=None,
            help='Specifies the password to be updated.',
        )

    def handle(self, *args, **options):
        User = get_user_model()
        password = options.get('password')
        username = options.get('username')
        email = options.get('email')

        username_field_type = type(User._meta.get_field(User.USERNAME_FIELD))
        username = email if username_field_type == EmailField else username
        username_type = "email" if username_field_type == EmailField else "username"
        if not password or not username:
            raise CommandError(f"You need to specify both password and {username_type}.")

        try:
            user = User.objects.get(**{User.USERNAME_FIELD: username})
            user.set_password(password)
            user.save()
            self.stdout.write("Superuser password reset successful.")
        except User.DoesNotExist:
            raise CommandError(f"User not found with the given {username_type}.")
