/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TheatreWork, ExhibitionWork, EssayWork, NovelWork, ResidencyItem, AwardItem } from './types';

// Let's reference the beautiful generated images for the ones we created,
// and elegant high-contrast geometric abstract svg or beautiful solid layouts for others, or reusable elegant placeholder blocks.
export const initialTheatreWorks: TheatreWork[] = [
  {
    id: 't-1',
    year: '2025',
    title: 'Living Sacrifice',
    synopsis: 'A play inspired by the Gimhae folktale *The Maiden Who Defeated the Monster*, asking what a “surviving sacrifice” might say to the “living sacrifices” who were offered up before her.',
    images: ['/assets/images/living_sacrifice_stage_1784632642341.jpg'],
    scriptExcerpt: `[Scene 1: The Altar of Silence]

(The sound of wind sweeping through an old cave. In the center, a simple wooden chair is lit by a cold, sharp spotlight. DAUGHTER stands in the shadow.)

DAUGHTER:
They called us selected. They called us sacred. But when the beast closed its jaws, there was no song, no holy light. Only the cold metal of the plate and the smell of old blood.

VOICE (From the dark):
And you? You breathed. You walked out.

DAUGHTER:
Yes, I survived. But surviving is a louder question than dying. I walk among the bones of those who were laid here before me. I must speak for the ones who remained silent on this stone.`,
    programBook: '43rd Gyeongsangnam-do Theatre Festival Official Entry. Staged at the Gimhae Cultural Center in October 2025.',
    review: '“A hauntingly beautiful piece of modern tragedy... Kim Woo Young turns folklore into an active, breathing interrogation of survivor’s guilt.” — Gyeongnam Culture Monthly',
    credits: 'Playwright: Kim Woo Young / Director: Lee Jin-ho / Cast: Kim Sun-young, Park Min-woo / Staged by Daegu Theatre Guild'
  },
  {
    id: 't-2',
    year: '2025',
    title: 'Nonda, Nonnon!',
    synopsis: 'In Miryang during the Joseon Dynasty, where the class system was rigid, Songhyeon, who loves to play and perform, joins a Namsadang troupe despite being a woman. Cheongun, Songhyeon’s friend, who wishes she would live an ordinary life, is constantly at odds with her. To mock the yangban who swagger on the strength of their status alone, Songhyeon creates a new form of play called Baekjungnori and asks Cheongun to join her.\n\nIn the present day, Yerim enters the university her parents wanted her to attend, but suffers frequent collapses from hyperventilation. Her dorm roommate suggests that she spend the break resting somewhere she truly wants to go, and Yerim thinks of her grandmother’s home in Miryang. Returning to Miryang for the first time since elementary school, Yerim reunites with Yongu, her childhood friend with whom she once learned Baekjungnori. Yongu, who lives freely doing what he loves at the Baekjungnori Preservation Society headed by Yerim’s grandmother, invites Yerim to perform the Obuk Dance in an upcoming Baekjungnori performance.',
    images: ['/assets/images/script_print_exhibit_1784632678140.jpg'],
    scriptExcerpt: `[Scene 4: The Sound of the Obuk Drum]

(Yerim stands in the courtyard of the Miryang Baekjungnori Preservation Society. She is holding drumsticks, her hands trembling slightly. Yongu stands beside her.)

YERIM:
My chest... it feels like it’s filling up with sand. The moment I try to breathe, the ceiling feels like it’s collapsing.

YONGU:
Then don’t breathe for the books. Breathe for the skin of this drum. Hit it. Hit it until the sand falls out of your lungs.

(Yerim strikes the drum. A deep, resonant boom fills the stage. Songhyeon’s shadow emerges in the background, dancing with the sword.)`,
    programBook: 'Supported by Youth Zipjung Collaboration. Staged in Miryang in September 2025 with the Miryang Traditional Art Group.',
    review: '“A powerful bridge between historical oppression and modern-day psychological claustrophobia.” — Performing Arts Quarterly',
    credits: 'Playwright: Kim Woo Young / Cast: Han Ji-won, Choi Sung-woo, Kang Min-jung'
  },
  {
    id: 't-3',
    year: '2024',
    title: 'Two Wives',
    synopsis: 'In 1951, Miok, who has fled to Busan with her soldier husband, welcomes Seonhwa, a maid hired by her husband to care for her during pregnancy. As Seonhwa moves through the house, she begins pointing out the strange things within it. Through Seonhwa, Miok is forced to confront her own place inside the house and asks for help getting beyond its walls. Having lived by clinging to memories of her girls’ school days, Miok says that before she dies in childbirth, she wants to go back to school. But Seonhwa tells her that the school is gone—and begins to speak of where she herself has come from.',
    images: ['/assets/images/living_sacrifice_stage_1784632642341.jpg'],
    scriptExcerpt: `[Scene 2: Inside the Paper House]

MIOK:
He said this house was safe. He said the war wouldn’t cross this wooden gate.

SEONHWA:
A house made of paper is only safe until someone lights a match, Madam. Look at the corners. There is ash rising from the floorboards. Your husband knows exactly when the wind will blow it away.

MIOK:
The school we used to attend... the brick building with the ivy. I want to sit in that classroom one last time before this baby arrives.

SEONHWA:
There is no ivy left, Madam. The ivy burned, and the red bricks are buried under the mud. Let me show you where we must actually walk.`,
    programBook: 'Staged at Busan Art Space, December 2024. Produced by The Project 1951.',
    review: '“An outstanding minimalist chamber play that exposes the gendered cages of war-era domesticity.” — Modern Theatre Review',
    credits: 'Playwright: Kim Woo Young / Director: Kim Chae-eun / Cast: Ryu Hyun-a, Yoon Se-ri'
  },
  {
    id: 't-4',
    year: '2024',
    title: 'Where the Clouds Reach',
    synopsis: 'In 18th-century Joseon, Yeona, a gisaeng from Eungcheon, encounters the shaman Seoju and Muyeon, a member of the Joseon diplomatic mission, and begins to pursue sword dance. After being selected as a ceremonial performer for a banquet honoring the mission, she travels to Hanyang with her friend Myeongwol under the name Unsim. There, as Yeona enters a wider artistic world and reunites with Muyeon, Myeongwol becomes entangled with a nobleman obsessed with her. Their conflict leaves Yeona facing a situation in which she may no longer be able to perform the sword dance.',
    images: ['/assets/images/script_print_exhibit_1784632678140.jpg'],
    scriptExcerpt: `[Scene 7: The Sword Dance on the Water]

(Yeona holds two blunt brass swords. She stands at the edge of the river. The reflections of the clouds glide across her white skirt.)

YEONA:
They told me the sword is only for cutting. They told me a woman’s hand should only hold silk. But when I hold this brass, the clouds feel like they are within my reach.

SEOJU:
A sword does not ask who holds it. It only moves where the wind demands. Dance, Yeona. Let Hanyang see the storm you carried from Eungcheon.`,
    programBook: 'Official entry of the Gyeongsangnam-do Theater Festival. Staged in June 2024.',
    review: '“Stunningly choreographed, with text that is as sharp and glittering as a brass sword.” — Traditional Arts Daily',
    credits: 'Playwright: Kim Woo Young / Choreography: Park Sun-hee / Cast: Cho Yu-ri, Min Ji-hwan'
  },
  {
    id: 't-5',
    year: '2023',
    title: 'The Line',
    synopsis: 'At ten o’clock on a bitterly cold night, as the shopping mall closes, people working as paid line stand-ins begin to queue. Behind the small tent belonging to the person in first place, the second spot is occupied by Lee Young, the vocalist of an obscure indie band, who is standing in line on behalf of someone trying to secure a pediatric appointment. The third spot belongs to Sejun, who was recently pressured into resigning after losing his place in line at work to a junior colleague known for being good at queueing; now he is standing in line for a luxury department store.\n\nAs the mall’s opening hour approaches, Sahyeon, who hired Sejun, and Oyun, who hired Lee Young, arrive. Sejun turns out to be Lee Young’s former boyfriend and former bandmate from their university club days, now working at the company owned by his fiancée’s grandfather. He has hired Sejun to buy a luxury handbag as a wedding gift. Oyun, meanwhile, is the wife of the very line stand-in who once took Sejun’s place. Before heading to a famous brunch café—where a clique of high-achieving mothers, including the mother who helped her secure a place at an elite private English kindergarten for her child, regularly gather—she has hired Lee Young to wait in line for a flu shot required for school drop-off. Wanting to be even one place ahead, Sahyeon and Oyun each insist that they are the rightful holder of second place in line.\n\nA security guard appears to hand out queue numbers. When he calls for the owner of the tent in first place and receives no answer, he unzips the tent and steps inside—only to discover the occupant frozen to death.',
    images: ['/assets/images/living_sacrifice_stage_1784632642341.jpg'],
    scriptExcerpt: `[Scene 5: The Frozen Boundary]

(The wind howls. The shopping mall lights flicker. Lee Young wraps a thin blanket tighter. Sejun paces up and down.)

LEE YOUNG:
We used to stand in lines to get into small clubs. To play a three-song set to five people. Now we stand in line so some kid gets a flu shot and some rich girl gets a calf-leather bag.

SEJUN:
It pays the rent, Young. The world didn’t want our three-song set. But it wants my feet to freeze here. It appreciates my patience more than my songs.

(The security guard approaches the small blue tent at the head of the queue.)

GUARD:
Number one? Wake up. It’s almost seven. Time to get your ticket. (No response. He unzips the tent. A long silence.) Oh my god...`,
    programBook: 'Winner of the Korea Theatre Festival One-Act Play Competition (Premium Category). Presented at the Seoul Drama Center in November 2023.',
    review: '“An outstanding, devastating social satire that perfectly captures the hyper-competitive, hollow nature of contemporary urban existence.” — The Seoul Cultural Review',
    credits: 'Playwright: Kim Woo Young / Cast: Kang Jin-woo, Seo Ye-ji, Lim Ji-hun'
  },
  {
    id: 't-6',
    year: '2023',
    title: 'Absent Person',
    synopsis: 'Gyeonga, who works as a live-in maid while caring for her mother-in-law Jeonghye and her son Junyoung, has little patience left for Jeonghye, who still waits for Cheolwoo, the husband who vanished five years ago. Having long filled Cheolwoo’s absence with a mutual bitterness, the family begins the day as usual, preparing breakfast—until Cheolwoo suddenly walks through the door with Junyoung, disheveled and looking like a beggar.\n\nIn postwar South Korea, where even the families of those connected to the North are punished under guilt by association, Gyeonga knows that Cheolwoo once went to North Korea with an acquaintance of his independence-activist father. Fearing that Cheolwoo’s return from the North will endanger Junyoung, she tries to drive him out, while Jeonghye is frantic that he might be taken by the police. Then Youngmin—a police officer, the son of Jeonghye’s friend, and a fellow orphanage alum of Gyeonga—knocks on the door.',
    images: ['/assets/images/script_print_exhibit_1784632678140.jpg'],
    scriptExcerpt: `[Scene 3: The Cold Breakfast Table]

JEONGHYE:
I made the barley rice. His father always liked barley in the morning.

GYEONGA:
He is gone, Mother. He has been gone for five years. He didn’t leave a note, and he didn’t leave any money. He left us with a debt and a shadow that won’t let Junyoung get a job.

(The door handle turns. A ragged, silent man enters, holding the hand of young Junyoung.)

JEONGHYE:
Cheolwoo...?

GYEONGA (Screaming):
Get out! Get out of this house before the neighborhood sees you!`,
    programBook: 'Staged at the Daehakro Arts Theater in May 2023.',
    review: '“A tight, breathless domestic thriller about political trauma and the violent cost of survival.” — Daehakro Stage Review',
    credits: 'Playwright: Kim Woo Young / Cast: Shim Hye-jung, Lee Sung-min, Han Tae-young'
  },
  {
    id: 't-7',
    year: '2022',
    title: 'Beloved Miok',
    synopsis: 'During the Japanese occupation, rumors that unmarried women are being conscripted as military comfort women sweep through a village where weddings become a desperate means of survival. Pressured by the voice of her mother echoing in her mind, Miok enters an unwanted marriage with Gicheol, a distant family acquaintance. But life with Gicheol—coercive, self-centered, and violent in the name of love—soon turns marriage into a prison.\n\nIn 1950, the outbreak of the Korean War offers Miok a chance at freedom. Before leaving for military training, Gicheol takes her to a refuge for the wives of soldiers, a place said to protect women whose husbands have gone to war. There, Miok is reunited with Hyunsu, her former lover, now the director of the home. Unlike Gicheol, Hyunsu offers her genuine care, and Miok finds herself drawn to him once more, even as her mother’s voice—urging her to be corrected, contained, and obedient—grows louder. One day, while helping Hyunsu run the refuge, Miok receives notice of Gicheol’s death.',
    images: ['/assets/images/living_sacrifice_stage_1784632642341.jpg'],
    scriptExcerpt: `[Scene 6: The Voice of the Mother]

MOTHER'S VOICE (Echoing):
Be quiet, Miok. A good girl does not let the neighbors hear her weeping. Keep your hands clean, keep your head low. Obedience is the only shield.

MIOK:
I was obedient, Mother. I married the man you chose, in the dress you made. And every night he locked the door from the outside. If that is a shield, then why does it feel like a blade?

HYUNSU:
Miok, look at me. The gates are open now. Gicheol is not coming back. The war has taken his key. You can walk out.`,
    programBook: 'Staged in cooperation with Seoul Art Space, November 2022.',
    review: '“A searing, poetic examination of institutional and domestic violence, beautifully woven through Miok’s inner landscape.” — Korean Drama Forum',
    credits: 'Playwright: Kim Woo Young / Director: Min Kyung-jun / Cast: Park Ji-a, Yoo Jung-hoon'
  },
  {
    id: 't-8',
    year: '2016',
    title: 'We’ll do anything for you',
    synopsis: 'Hojun works at an errand service agency. His friend Gichan tells him that Inyoung, the lover of his boss, will be visiting the agency with a request. Inyoung asks Hojun to kill her.',
    images: ['/assets/images/script_print_exhibit_1784632678140.jpg'],
    scriptExcerpt: `[Scene 1: The Request]

HOJUN:
We do deliveries, we find lost dogs, we clean houses after people move. We don’t... do what you’re asking.

INYOUNG:
Your sign outside says "We'll do anything for you." Is my life not included in "anything"?

HOJUN:
Why would you want this?

INYOUNG:
Because he won’t let me leave. And dying by a stranger's hand is the only way he can't claim my body afterwards.`,
    programBook: 'Winner of the SNUST Creative Writing Award. Staged as an independent workshop in 2016.',
    review: '“A chilling, minimalist neo-noir script that explores the dark desperation of human ownership.” — SNUST Literary Press',
    credits: 'Playwright: Kim Woo Young / Cast: Lee Jae-sung, Kang Da-eun'
  }
];

export const initialExhibitionWorks: ExhibitionWork[] = [
  {
    id: 'e-1',
    year: '2025',
    title: 'Living Sacrifice',
    medium: 'vinyl lettering_variable installation',
    images: ['/assets/images/shadow_installation_1784632657498.jpg'],
    description: 'An installation of theatrical text directly applied as vinyl lettering across the white walls of the museum gallery. The text disappears and reappears based on the shifting angle of natural light entering the space.'
  },
  {
    id: 'e-2',
    year: '2025',
    title: 'From the Blackout',
    medium: 'Script collection_variable installation',
    images: ['/assets/images/script_print_exhibit_1784632678140.jpg'],
    description: 'A physical display of script loose-leaves suspended in mid-air by delicate wires. Visitors walk through the floating text, creating small currents of wind that cause the pages to turn and sway, making reading an active bodily navigation.'
  },
  {
    id: 'e-3',
    year: '2025',
    title: 'From the Story',
    medium: 'inkjet print on paper_variable installation',
    images: ['/assets/images/script_print_exhibit_1784632678140.jpg'],
    description: 'A series of high-resolution digital prints showcasing redacted historical court logs and folk testimonies, where the names of female victims have been restored in bold ink, while official statements are faded to the threshold of illegibility.'
  },
  {
    id: 'e-4',
    year: '2025',
    title: 'Shadow',
    medium: 'Paint on discarded banners_variable installation',
    images: ['/assets/images/shadow_installation_1784632657498.jpg'],
    description: 'Discarded promotional theater banners from past local performances, painted over with opaque black acrylic paint, leaving only occasional letters and words visible. A critique of the short-lived nature of localized cultural events.'
  },
  {
    id: 'e-5',
    year: '2025',
    title: 'From Outside the Story',
    medium: 'Single-channel video_6 minutes',
    images: ['/assets/images/living_sacrifice_stage_1784632642341.jpg'],
    description: 'A slow-moving video portrait tracking the hands of local residents as they handle old documents, folklore props, and soil from historical execution sites. Silent, with only the ambient sounds of paper shuffling and breath.'
  },
  {
    id: 'e-6',
    year: '2025',
    title: 'From the Mind',
    medium: 'Pen on paper_variable installation',
    images: ['/assets/images/script_print_exhibit_1784632678140.jpg'],
    description: 'A dense map of handwritten notes, historical timelines, and mythological connections written directly onto a 10-meter roll of traditional Korean mulberry paper, displayed across a long minimalist black table.'
  }
];

export const initialEssayWorks: EssayWork[] = [
  {
    id: 'es-1',
    year: '2024',
    title: 'A lavish letter to you',
    publishedIn: '『This story is you』_Small Issue',
    description: 'An essay in the form of a letter addressed to an isolated young person. A letter is a piece of writing that asks after and conveys one another’s well-being. The age we live in does not ask after one another in that way. What we need now is not the kind of concern that asks after someone for one’s own benefit or in order to judge them, but concern that sincerely cares for the other person. I think of a letter as a luxurious form of writing devoted to a single reader. Perhaps this is one luxury we should allow ourselves.',
    excerpt: `I think letters are the most luxurious form of writing in the world. Because it's a piece written for just one reader. Shouldn't we be allowed to indulge in a luxury like this? Now, this letter is probably somewhere in your house, right? It will always be near you whenever you want it to be, so please find it and read it whenever you need it. In this letter, I will root for you no matter what, indulge your every mood, and tell you that you're always right. Just like a Saturday, when it feels like only good things are bound to happen, I will only say good things to you.

We all need a day like that, and a person like that.

-Written in the morning, remembering how much I used to like Saturdays.`
  },
  {
    id: 'es-2',
    year: '2023',
    title: 'Shall I live a little longer?',
    publishedIn: '『2W magazine』_AMIGA',
    description: 'What keeps alive someone who no longer wants to live.',
    excerpt: `I once heard somewhere that human beings are born to fulfill a given role. Honestly, I find it overwhelming just making sure I function properly as a human being. Life day to day is already heavy enough; asking us to carry a designated role on top of that feels like asking too much of a person. Either way, whether by good luck or bad, I'm already here—so now, how should I live? (Even though it's been nearly thirty years since I was born.)

...Come to think of it, though, have I ever actually wanted to live?`
  }
];

export const initialNovelWorks: NovelWork[] = [
  {
    id: 'n-1',
    year: '2021',
    title: 'If I had potatoes, I’d make a sandwich',
    publishedIn: '『Mumyeong Vol.3 Non-Self(無我)』_ Sontopdal',
    description: 'A person can become both a place to return to and a reason to return.',
    excerpt: `-By one in the morning, the subway station had grown quiet enough to make you drowsy, so whenever a train suddenly pulled into the opposite platform or an express train thundered past, my body jolted in surprise. Each time, I grabbed Nama’s hand tightly. Even without platform screen doors, there was no chance that Nama, sitting on the bench, would be hit by a train, but for some reason I felt anxious and reached for her hand. “Are you scared of loud noises?” Nama didn’t hold my hand back. “I keep thinking you might jump.” “I won’t, not in front of you.” The way Nama smiled lightly, showing her crooked tooth, only made me more uneasy, and I told her firmly never to do that. “Because that would be the only thing I’d remember.” Without answering, Nama brushed the back of my hand with her thumb. I could feel her heartbeat through her arm. My chest ached with gratitude.`
  },
  {
    id: 'n-2',
    year: '2020',
    title: 'Naya, sara',
    publishedIn: '『Mumyeong Vol.2 Panic』_Sontopdal',
    description: 'At her brother’s house, Naya meets Sara, his girlfriend, and takes her away.',
    excerpt: `-Sara came over in a white dress—one embroidered with flower petals along the collarbone, the fabric cut away so that skin showed through in the shape of the petals. With blush on her pale face, Sara arrived at my brother’s house. Without a word, she lowered her head to me. It felt less like a greeting than an apology, as if instead of saying hello she were saying I’m sorry, and instead of I’m sorry, saying I’m Sara. I hesitated for a moment, unsure whether to say hello or it’s okay. Sara had both hands clasped together. Looking at them, I told her to take good care of my brother. My brother had told me that was what I should say when I met Sara.`
  },
  {
    id: 'n-3',
    year: '2016',
    title: 'Please step back',
    publishedIn: 'The SeoulTech Times',
    description: 'After her older sister, once consumed by the civil service exam, takes her own life, the younger sister sets out to recover the traces she left behind by writing the suicide note that was never written.',
    excerpt: `-My sister fell. I stare down at the sentence written on the back of a used sheet of paper. No matter how long I look at it, I cannot write the next line. My sister is dead. I did not see her fall, but I can imagine how it happened. She must have stood with both arms spread wide and fallen backward, as if retreating from a room. My sister fell to her death. That is all. It was absurd to try to write someone else’s suicide note in their place. I know nothing about my sister. No matter how often I secretly read her diary or stay close beside her, I still do not know her. I pull her laptop in front of me and turn it on. On the screen, the word failed appears in red. My sister failed. In a single step, she fell. In a single step, she withdrew from life. For your safety, please step back from the platform edge. The announcement my sister and I heard dozens of times on the subway circles in my ears. Where was the dangerous place for her? Who was it that wanted her to step back? In her diary, in the way she spoke, in the things she did—was she calling out to me, Excuse me? And did I turn around then? I stepped back from my sister’s life. And my sister fell away.`
  }
];

export const initialResidencies: ResidencyItem[] = [
  {
    id: 'r-1',
    year: '2026',
    name: 'Seoul Art Space Yeonhui',
    period: '2026.10.1 - 12.28',
    location: 'Seoul, South Korea',
    outcome: 'Currently developing a new full-length play exploring the modern resonance of female oral histories in rural Gyeonggi province, investigating the intersections of theatrical scriptwriting and concrete spatial sculpture.'
  },
  {
    id: 'r-2',
    year: '2025',
    name: 'Welcome Residency',
    period: '2025.03.10 - 12.19',
    location: 'Gimhae, South Korea',
    outcome: 'Based on the Gimhae folktale The Maiden Who Defeated the Monster, I wrote a play exploring the stories of young girls offered as human sacrifices and presented it as an installation work through an exhibition. As an opening performance for the exhibition, I staged a dramatic staged reading in collaboration with Daegu-based actors.\n\nI authored the play From the Blackout (Amjeon-euro-buteo) purely for exhibition purposes, rather than for traditional stage performance or publication. Through a two-person exhibition with a painter, I visualized the play within an exhibition space and have since continued to explore various ways to translate theatrical texts into visual formats.'
  },
  {
    id: 'r-3',
    year: '2024',
    name: 'ARINA Season 2 Residency',
    period: '2024.05.09 - 10.31',
    location: 'Miryang, South Korea',
    outcome: 'I authored a play exploring the lives of Korean youth—past and present—through the lens of "playful interaction," inspired by the Miryang Baekjungnoli, a traditional folk game performed on Baekjung Day in Miryang, Gyeongsangnam-do. I collaborated with a Miryang-based theater company to bring the work to the stage.'
  },
  {
    id: 'r-4',
    year: '2023',
    name: 'ARINA Season 1 Residency',
    period: '2023.06.01 - 11.30',
    location: 'Miryang, South Korea',
    outcome: 'I wrote a play depicting the life of Unsim, a gisaeng from Miryang, Gyeongsangnam-do, who created the Miryang Sword Dance (Miryang Geommu). The play incorporates four traditional Korean dances. I collaborated on multiple performances with a Miryang-based theater company, and the work was selected as an official entry for the Gyeongsangnam-do Theater Festival.'
  },
  {
    id: 'r-5',
    year: '2023',
    name: 'Seoul Art Space Yeonhui',
    period: '2023.04.03 - 04.26',
    location: 'Seoul, South Korea',
    outcome: 'I wrote a play depicting the lives of people who work as line-waiters and the clients who hire them, aiming to capture the desires of modern society. The script won an award at the Korea Theater Festival\'s Outstanding Short Play Competition.'
  },
  {
    id: 'r-6',
    year: '2023',
    name: 'Toji Cultural Center Residency',
    period: '2023.01.02 - 01.16',
    location: 'Wonju, South Korea',
    outcome: 'Completed draft of the historical theatrical script Where the Clouds Reach, focusing on the agency of female sword-dancers (gisaeng) in the late Joseon dynasty.'
  }
];

export const initialAwards: AwardItem[] = [
  {
    id: 'a-1',
    year: '2026',
    title: 'Selected for the 2026 Literary Creative Workspace Support Program_Arts Council Korea (ARKO)',
    category: 'Grants'
  },
  {
    id: 'a-2',
    year: '2026',
    title: 'Selected for the K-Art Young Artists Support Grant_Seoul Foundation for Arts and Culture',
    category: 'Grants'
  },
  {
    id: 'a-3',
    year: '2026',
    title: 'Selected Artist for the International Cultural Exchange Program for Regional Artists_Guro Arts Valley Foundation',
    category: 'Selections'
  },
  {
    id: 'a-4',
    year: '2025',
    title: 'Selected for the Young Artists independence Support Grant_GyeongGi Cultural Foundation',
    category: 'Grants'
  },
  {
    id: 'a-5',
    year: '2025',
    title: 'Selected Playwright for the 43rd Gyeongsangnam-do Theatre Festival in Geochang_Gyeongnam Theatre Association',
    category: 'Selections'
  },
  {
    id: 'a-6',
    year: '2024',
    title: 'Selected for Emerging Artist Production Support_Youth Zipjung Collaboration (Today Association)',
    category: 'Grants'
  },
  {
    id: 'a-7',
    year: '2024',
    title: 'Selected for the Emerging Artists Creative Activity Preparation Grant_Korea Artists Welfare Foundation (KAWF)',
    category: 'Grants'
  },
  {
    id: 'a-8',
    year: '2023',
    title: 'Winner, One-Act Play Competition (Premium Short Play Category)_Korea Theatre Festival',
    category: 'Awards'
  },
  {
    id: 'a-9',
    year: '2016',
    title: 'Grand Prize in Fiction, Seoul National University of Science and Technology Creative Writing Award_The SeoulTech Press',
    category: 'Awards'
  }
];

export const initialCV = {
  education: [
    'Department of Creative Writing, Seoul National University of Science and Technology (B.F.A.)',
    'Department of Creative Writing, Goyang Arts High School'
  ],
  writing: [
    { year: '2025', text: 'Living Sacrifice (Playwriting)' },
    { year: '2025', text: 'Nonda, Nonnon! (Playwriting)' },
    { year: '2024', text: 'Two Wives (Playwriting)' },
    { year: '2024', text: 'Unshim (Playwriting)' },
    { year: '2024', text: 'Where the Clouds Reach (Playwriting)' },
    { year: '2024', text: 'A lavish letter to you (Essay)' },
    { year: '2023', text: 'The Line (Playwriting)' },
    { year: '2023', text: 'Shall I live a little longer? (Essay)' },
    { year: '2023', text: 'Absent Person (Playwriting)' },
    { year: '2022', text: 'Beloved Miok (Playwriting)' },
    { year: '2021', text: 'If I had potatoes, I’d make a sandwich (Novel)' },
    { year: '2020', text: 'Naya, Sara (Novel)' },
    { year: '2016', text: 'We’ll do anything for you (Playwriting)' },
    { year: '2016', text: 'Please step back (Novel)' }
  ],
  exhibitions: [
    { year: '2026', text: 'HAVE A SEAT TEXT FAIR_Unwoo Art Museum_Seoul' },
    { year: '2025', text: 'A Soft Landing_Art Space Sarang Farm_Gimhae' },
    { year: '2025', text: 'Welcome Residency X Art District_p: Invisible Times_Gallery Mugye_Gimhae' },
    { year: '2025', text: 'LIGHTS OFF_Gallery Mugye_Gimhae' },
    { year: '2025', text: 'Preview Exhibition_Gallery Mugye_Gimhae' }
  ],
  awardsSelections: [
    { year: '2026', text: 'Selected for the 2026 Literary Creative Workspace Support Program_Arts Council Korea (ARKO)' },
    { year: '2026', text: 'Selected for the K-Art Young Artists Support Grant_Seoul Foundation for Arts and Culture' },
    { year: '2026', text: 'Selected Artist for the International Cultural Exchange Program for Regional Artists_Guro Arts Valley Foundation' },
    { year: '2025', text: 'Selected for the Young Artists independence Support Grant_GyeongGi Cultural Foundation' },
    { year: '2025', text: 'Selected Playwright for the 43rd Gyeongsangnam-do Theatre Festival in Geochang_Gyeongnam Theatre Association' },
    { year: '2024', text: 'Selected for Emerging Artist Production Support_Youth Zipjung Collaboration (Today Association)' },
    { year: '2024', text: 'Selected for the Emerging Artists Creative Activity Preparation Grant_Korea Artists Welfare Foundation (KAWF)' },
    { year: '2023', text: 'Winner, One-Act Play Competition (Premium Short Play Category)_Korea Theatre Festival' },
    { year: '2016', text: 'Grand Prize in Fiction, Seoul National University of Science and Technology Creative Writing Award_The SeoulTech Press' }
  ]
};

export const initialAbout = {
  bio: 'Kim Woo Young is a playwright and writer based in South Korea whose work expands theatre beyond the stage, exploring new possibilities for dramatic writing through exhibitions, installations, and interdisciplinary collaborations.',
  statement: [
    'Kim Woo Young focuses on women who have been overlooked, erased, or simplified within history. Through local folklore, oral traditions, historical records, and forgotten narratives, she reconstructs voices that remain absent from official histories. Rather than reproducing the past, she asks how history continues to shape the present and how theatre can become a place where these hidden stories are encountered anew.',
    'Her projects often begin with long periods of field research undertaken during artist residencies. Walking through unfamiliar cities, reading local archives, speaking with residents, and collecting fragments of memory become integral parts of her creative process. These materials gradually evolve into plays, installations, exhibitions, and publications, blurring the boundaries between research and artistic production.',
    'Her recent practice has expanded beyond the conventional format of dramatic writing. Alongside performances, she has presented installations, video works, and exhibitions that investigate what remains after a performance ends. She is interested in creating works that exist between literature and visual art, between documentation and fiction, and between theatre and exhibition.',
    'For Kim, theatre is not simply a performance but a method of research, a way of listening, and a way of making invisible histories visible. Her work invites audiences to enter quiet spaces where memory, absence, and imagination intersect.'
  ]
};

export const initialContact = {
  email: 'wyoung95@naver.com',
  instagram: '@wooyoungann',
  instagramUrl: 'https://instagram.com/wooyoungann'
};
