from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_mail_chimp_AI_test",
    version="0.1",
    packages=["mail_chimp_AI_test"],
    install_requires=[],
    cmdclass={"build": BuildCommand},
)