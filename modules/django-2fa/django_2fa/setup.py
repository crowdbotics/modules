from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_2fa",
    version="0.1",
    packages=["two-factor-authentication"],
    install_requires=["twilio", "sendgrid", "django-phonenumber-field==6.1.0", "phonenumbers==8.12.45"],
    cmdclass={"build": BuildCommand},
) 
