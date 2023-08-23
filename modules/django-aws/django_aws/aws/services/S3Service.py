import io
import boto3


class S3Service:

    def __init__(self, region, access_key, access_secret):
        try:
            self.s3_client = boto3.client('s3',
                                          region_name=region,
                                          aws_access_key_id=access_key,
                                          aws_secret_access_key=access_secret)
        except Exception:
            raise

    def list_aws_buckets(self):
        try:
            response = self.s3_client.list_buckets()
            return response
        except Exception:
            raise

    def create_aws_bucket(self, bucket):
        try:
            response = self.s3_client.create_bucket(Bucket=bucket)
            return response
        except Exception:
            raise

    def delete_aws_bucket(self, bucket, owner_id):
        try:
            response = self.s3_client.delete_bucket(
                Bucket=bucket,
                ExpectedBucketOwner=owner_id
            )
            return response
        except Exception:
            raise

    def upload_aws_file(self, file, bucket, file_name):
        try:
            file_as_binary = io.BytesIO(file)
            res = self.s3_client.upload_fileobj(file_as_binary, bucket, file_name)
            return res
        except Exception:
            raise

    def download_aws_file(self, bucket, file_name, path_to_save_file):
        try:
            self.s3_client.download_file(bucket, file_name, f"{path_to_save_file}/{file_name}")
            url = f"{path_to_save_file}/{file_name}"
            return url
        except Exception:
            raise

    def create_presigned_aws_url(self, file_name, bucket, expiration=3600):
        try:
            response = self.s3_client.generate_presigned_url('get_object',
                                                             Params={'Bucket': bucket, 'Key': file_name},
                                                             ExpiresIn=expiration)
            return response
        except Exception:
            raise
