from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_profile",
    version="0.1",
    packages=[],
    install_requires=[
        "django-countries==7.5",
        "asgiref==3.6.0",
        "django-phonenumber-field==4.0.0",
        "django-phonenumbers"
    ],
    cmdclass={"build": BuildCommand},
)
