const images = [
  require('../img/Image10.png'),
  require('../img/Image11.png'),
  require('../img/Image2.png'),
  require('../img/Image3.png'),
  require('../img/Image4.png'),
  require('../img/Image1.png'),
  require('../img/Image12.png'),
  require('../img/Image8.png'),
  require('../img/Image6.png'),
  require('../img/Image9.png'),
  require('../img/Image5.png'),
  require('../img/Image7.png'),
];

export const Conversations = [
  {
    withUserId: 1,
    withUser: {
      id: 1,
      firstName: 'Helen',
      lastName: 'Gilbert',
      phone: '+1 415 670 90 34',
      country: 'Belarus',
      email: 'h.gilbert@akveo.com',
      password: '123456',
      newPassword: '12345678',
      confirmPassword: '12345678',
      photo: require('../img/avatars/Image9.png'),
      postCount: 86,
      followersCount: 22102,
      followingCount: 536,
      images,
    
    },
    messages: [
      {
        id: 0,
        type: 'out',
        time: -300,
        text: 'Hey, how’ve you been?',
      },
      {
        id: 1,
        time: -240,
        type: 'in',
        text: 'Yeah, not bad, actually I finally got a call back from that job that I interviewed for, and guess what? I got it!',
      },
      {
        id: 2,
        time: -230,
        type: 'out',
        text: 'Awesome! Yeah, well done, that’s really great to hear. Do you start right away?',
      },
      {
        id: 3,
        time: -100,
        type: 'out',
        text: 'Well, uhm yes and no, I go in for training tomorrow, but I don’t really start until next week. ' +
        'Do you have some time this weekend, maybe we could get together?',
      },
      {
        id: 4,
        time: -45,
        type: 'in',
        text: 'I’ve got a lot planned this weekend, just running around, doing loads of stuff, but Friday’s pretty open.',
      },
      {
        id: 5,
        time: -5,
        type: 'out',
        text: 'That works pretty well for me!',
      }],
  },
  {
    withUserId: 5,
    withUser: {
      id: 5,
      firstName: 'Clayton',
      lastName: 'O\'Mullaney',
      email: 'cmullaney4@tripadvisor.com',
      country: 'Philippines',
      password: 'ZlzECwoN',
      newPassword: 'N9l5KLpBW',
      confirmPassword: 'N9l5KLpBW',
      postCount: 37,
      phone: '63-(210)188-9126',
      followingCount: 745,
      followersCount: 2703,
      images,
      photo: require('../img/avatars/Image5.png'),
    },
    messages: [
      {
        id: 0,
        type: 'out',
        time: -300,
        text: 'I have no idea what to buy for Mary for her birthday.',
      },
      {
        id: 1,
        time: -240,
        type: 'in',
        text: 'Me, neither! Would you like to go in and buy her a gift together?',
      },
      {
        id: 2,
        time: -100,
        type: 'out',
        text: 'If I remember right, she likes music, skiing, and reading',
      },
      {
        id: 3,
        time: -45,
        type: 'out',
        text: 'You know, maybe we could get her some concert tickets. Who would know her favorite groups?',
      },
      {
        id: 4,
        time: -25,
        type: 'in',
        text: 'Her roommate, Malia, might know what her favorite groups are.',
      },
      {
        id: 5,
        time: -5,
        type: 'out',
        text: 'Cool! Let\'s give Malia a call and ask her for her help right now',
      }],
  },
];

export default Conversations;
