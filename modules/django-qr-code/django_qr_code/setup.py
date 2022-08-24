from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_qr_code",
    version="0.1",
    packages=["qr-code"],
    install_requires=["qrcode"],
    cmdclass={"build": BuildCommand},
) 