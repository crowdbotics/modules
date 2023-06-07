from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_payments",
    version="0.1",
    packages=["payments"],
    install_requires=[
        "stripe==2.26.0",
    ],
    cmdclass={"build": BuildCommand},
)
