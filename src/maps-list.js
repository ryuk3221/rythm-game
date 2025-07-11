import { map4 } from "./notes";
import { map7 } from "./notes";

export const maps = [
  {
    id: 1,
    title: "Yuumeikyou o Wakatsu Kotoi by Kushi",
    difficulty: "Easy",
    stars: 2,
    notes: [{ delay: 1000, column: 2, id: "0", y: 0 }],
    imgPath: './map1.jpg',
    musicPath: './sounds/1.mp3',
    previewTiming: 161,
    bpm: '121-151',
    duration: '3:34'
  },
  {
    id: 2,
    title: "Yuumeikyou o Wakatsu Kotoi by Kushi",
    difficulty: "Hard",
    stars: 4,
    notes: [1000],
    imgPath: './map1.jpg',
    musicPath: './sounds/1.mp3',
    previewTiming: 161,
    bpm: '121-151',
    duration: '3:34'
  },
  {
    id: 3,
    title: "Yousei Teikoku Hades - The rise",
    difficulty: "Easy",
    stars: 3,
    notes: [1000],
    imgPath: './map2.jpg',
    musicPath: './sounds/2.mp3',
    previewTiming: 123.5,
    bpm: '210',
    duration: '4:16'
  },
  {
    id: 4,
    title: "Yousei Teikoku Hades - The rise",
    difficulty: "Insane",
    stars: 5,
    notes: map4,
    imgPath: './map2.jpg',
    musicPath: './sounds/2.mp3',
    previewTiming: 123.5,
    bpm: '210',
    duration: '4:16'
  },
  {
    id: 5,
    title: "Doomsday Architects",
    difficulty: "Insane",
    stars: 5,
    notes: [1000],
    imgPath: './map3.jpg',
    musicPath: './sounds/3.mp3',
    previewTiming: 193,
    bpm: '210',
    duration: '4:16'
  },
  {
    id: 6,
    title: "Demetori - Dawn of the dead",
    difficulty: "Insane",
    stars: 5,
    notes: [1000],
    imgPath: './map4.jpg',
    musicPath: './sounds/4.mp3',
    previewTiming: 262.15,
    bpm: '210',
    duration: '4:16'
  },
    {
    id: 7,
    title: "Mirabi Frame, Yui Katsuragi - Shokuzai",
    difficulty: "Extreme",
    stars: 5,
    notes: map7,
    imgPath: './map5.jpg',
    musicPath: './sounds/5.mp3',
    previewTiming: 236.4,
    bpm: '260',
    duration: '4:16'
  },
];