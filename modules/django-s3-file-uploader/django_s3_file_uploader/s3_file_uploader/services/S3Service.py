import io
import boto3


class S3Service:
    def __init__(self, region, access_key, access_secret):
        """
        Before using Boto3, you need to set up authentication credentials for AWS account using S3_ACCESS_KEY, and S3_ACCESS_SECRET for user.
        You can either choose an existing user or create a new one.
        """
        try:
            self.s3_client = boto3.client(
                "s3",
                region_name=region,
                aws_access_key_id=access_key,
                aws_secret_access_key=access_secret,
            )
        except Exception:
            raise

    def list_s3_buckets(self):
        """
        Retrieve the list of existing buckets
        """
        try:
            response = self.s3_client.list_buckets()
            return response
        except Exception:
            raise

    def create_s3_bucket(self, bucket_name):
        """
        Create an S3 bucket in a specified region
        :param bucket_name: Bucket to create
        :return: Creates a new s3 bucket
        """
        try:
            response = self.s3_client.create_bucket(Bucket=bucket_name)
            return response
        except Exception:
            raise

    def delete_s3_bucket(self, owner_id, bucket_name):
        """
        Deletes an S3 bucket
        :param bucket_name:  to create
        :param owner_id: Owner of the bucket
        :return: Deletes an existing s3 bucket
        """
        try:
            response = self.s3_client.delete_bucket(
                ExpectedBucketOwner=owner_id,
                Bucket=bucket_name,
            )
            return response
        except Exception:
            raise

    def upload_s3_file(self, file, bucket, file_name):
        """
        Upload a file to an S3 bucket
        :param file: File to upload
        :param bucket: Bucket to upload to
        :param file_name: S3 object name. If not specified then file_name is used
        :return: True if file was uploaded, else False
        """
        try:
            file_as_binary = io.BytesIO(file)
            res = self.s3_client.upload_fileobj(file_as_binary, bucket, file_name)
            return res
        except Exception:
            raise

    def download_s3_file(self, bucket, file_name, path_to_save_file):
        """
        Downloads a file from an S3 bucket
        :query_param bucket:  to download to
        :query_param file_name: S3 object name. If not specified then file_name is used
        :return: True if file was uploaded, else False
        """
        try:
            self.s3_client.download_file(
                bucket, file_name, f"{path_to_save_file}/{file_name}"
            )
            url = f"{path_to_save_file}/{file_name}"
            return url
        except Exception:
            raise

    def delete_s3_file(self, bucket, file_name):
        """
        Deletes a file from an S3 bucket
        :param bucket: Bucket where file exists
        :param file_name: File to be deleted
        :return: Deletes a file from an S3 bucket returns no content
        """
        try:
            response = self.s3_client.delete_object(Bucket=bucket, Key=file_name)
            return response
        except Exception:
            raise

    def create_presigned_s3_url(self, file_name, bucket, expiration=3600):
        """
        Generate a presigned URL to grant a user temporary access to an S3 object
        :param bucket: name of the bucket
        :param file_name: Name of the file in s3 bucket
        :param expiration: Time in seconds for the presigned URL to remain valid
        :return: Presigned URL as string. If error, returns None.
        """
        try:
            response = self.s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": bucket, "Key": file_name},
                ExpiresIn=expiration,
            )
            return response
        except Exception:
            raise
