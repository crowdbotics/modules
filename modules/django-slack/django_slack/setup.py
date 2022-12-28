from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_slack",
    version="0.1",
    packages=["slack"],
    install_requires=["slack-sdk==3.19.5"],
    cmdclass={"build": BuildCommand},
)