Freqently asked questions

This module is responsible for showing the FAQ list with a pagination. Additionally, it also provide a search FAQ feature with the fetched FAQ list.

Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and add following variables as mentioned below:

1. ENV file :-
   FAQ_PREFIX_QUESTION=<Question Prefix>
   FAQ_PREFIX_ANSWER=<Answer Prefix>
   FAQ_VISUAL_EXPANDED=<Boolean True or False>

2. settings.py :-
   FAQ_PREFIX_QUESTION = env.str("FAQ_PREFIX_QUESTION", default="Ques")
   FAQ_PREFIX_ANSWER = env.str("FAQ_PREFIX_ANSWER", default="Ans")
   FAQ_VISUAL_EXPANDED = env.bool("FAQ_VISUAL_EXPANDED", default=False)
   default value for env variable as per need.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.
License

MIT
