from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_drive",
    version="0.1",
    packages=["drive"],
    install_requires=["google-api-python-client", "google-auth-httplib2", "google-auth-oauthlib"],
    cmdclass={"build": BuildCommand},
)