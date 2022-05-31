import requests
import json


class ApplePaymentService:
    APPLE_PRODUCT_VERIFY_URL = 'https://buy.itunes.apple.com/verifyReceipt'
    APPLE_SANDBOX_VERIFY_URL = 'https://sandbox.itunes.apple.com/verifyReceipt'
    SANDBOX_STATUS_CODE = 21007

    @classmethod
    def validate_receipt_data(cls, receipt_data):
        is_valid = False
        if 'transactionReceipt' in receipt_data:
            is_valid = True
        # TODO: add more validation
        return is_valid

    @classmethod
    def verify_apple_receipt(cls, receipt_data):
        """
        Verify an Apple receipt.
        """
        # validate receipt
        is_receipt_valid = cls.validate_receipt_data(receipt_data)
        if not is_receipt_valid:
            return False

        receipt_json = json.dumps({"receipt-data": receipt_data["transactionReceipt"]})

        # verify receipt
        verify_url = cls.APPLE_PRODUCT_VERIFY_URL
        response = requests.request(
            method='POST',
            url=verify_url,
            headers={'Content-Type': 'application/x-www-form-urlencoded'},
            data=receipt_json
        )
        if response.status_code == 200:
            res_json = response.json()
            if res_json.get('status', None) == cls.SANDBOX_STATUS_CODE:
                print("now calling sandbox")
                verify_url = cls.APPLE_SANDBOX_VERIFY_URL
                response = requests.request(
                    method='POST',
                    url=verify_url,
                    headers={'Content-Type': 'application/x-www-form-urlencoded'},
                    data=receipt_json
                )
                if response.status_code == 200:
                    res_json = response.json()
                    return res_json, True
                elif res_json.get('status', None) == 0:
                    # verify success
                    return res_json, True
            else:
                return res_json, False
                # failure
        return False, False
