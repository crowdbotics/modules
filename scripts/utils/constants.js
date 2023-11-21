/**
 * Python files
 */
export const setupPy = (name) => `from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_${name}",
    version="0.1",
    packages=["${name}"],
    install_requires=[],
    cmdclass={"build": BuildCommand},
)`;

export const pyprojectToml = `[build-system]
requires = ["setuptools"]
build-backend = "setuptools.build_meta"`;
