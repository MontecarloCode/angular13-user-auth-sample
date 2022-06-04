// export interface Roles {
//     subscriber?: boolean;
//     analyst?: boolean;
//     editor?: boolean;
//     admin?: boolean;
// }

export interface User {
  uid: string;
  email: string;
  imageURL: string;
  password: string;
  created_at: string;
  nickName: string;
  fullName: string;
  preferredName: string;

  // phoneNumber?: number;
  // роли пользователя: любопытный, пользователь, лидер, альфа
  role: 'curious' | 'user' | 'leader' | 'alfa';
  age: string;
  gender:
    | 'Female'
    | 'Male'
    | 'Non-binary'
    | 'Transgender'
    | 'Intersex'
    | 'Prefer not to say';
  emailVerified: boolean;
  aliasUrl: string;
  lastSession: string;
}
export interface Cargo {
  code: string;
  sit: string;
  time: string;
  ENemoState: string;
  emoScape: string;
  gr59: string;
  city: string;
  cityLatLong: string;
  country: string;
  decisionSpeedSit: string;
  rapidAssessment: string;
  noteSit: string;
}
export interface NoteSituation {
  uidSit: string;
  content: string;
  description: string;
}
