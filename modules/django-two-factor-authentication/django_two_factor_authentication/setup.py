from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_two_factor_authentication",
    version="0.1",
    packages=["two_factor_authentication"],
    install_requires=["twilio", "sendgrid", "django-phonenumber-field==6.1.0", "phonenumbers==8.12.45", "pyotp"],
    cmdclass={"build": BuildCommand},
) 
