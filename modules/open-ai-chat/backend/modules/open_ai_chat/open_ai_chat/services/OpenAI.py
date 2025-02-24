import os
from openai import OpenAI as core_openai

class OpenAI:   
    client = None
    model = None
    max_tokens = 1000
    def __init__(self, api_key=None, model='gpt-3.5-turbo'):
        self.api_key = api_key or os.environ.get("OPENAI_API_KEY", "")
        self.client = core_openai(
            api_key=self.api_key,
        )
        self.model = model

    # todo: calculate number of tokens based on question length + context length + model
    # todo: add context to the question

    def ask(self, question, context=[]):
        messages = context
        messages.append({"role": "user", "content": question})
        messages.append({
            "role": "system",
            "content": "follow the rules: rule 1. short 2-3 liner chat type answers. rule 2. you must iclude a summary at the end or every message, summary should include context from provided system message, current question and answer to be used as context for next message.",
        })
        response = self.client.chat.completions.create(
            messages=messages,
            model=self.model,
            max_tokens=self.max_tokens,
        )
        return response.choices[0].message.content