/**
 * Story-Rich Hot Comments for GeoMelody (地球旋律)
 * Inspired by NetEase Cloud Music (网易云音乐) Hot Story Reviews & Travel Reflections
 */

export const HOT_COMMENTS_DATABASE = {
  // 1. 半岛铁盒 · 周杰伦
  'bandao-tiehe': [
    {
      author: '千禧年的第一场风铃', enAuthor: 'First Wind Chime of 2000', likes: 9842,
      text: '高中时用复读机听这首歌，后座的女孩问我借磁带，我把那盘《八度空间》借给她，磁带盒里夹了一张没敢递出去的纸条。现在我们各奔东西，但每次前奏的风铃声一响，我依然能闻到那年夏天阳光晒透校服的味道。',
      enText: 'In high school, I listened to this cassette on a repeater. The girl behind me asked to borrow it, so I gave her Eight Dimensions with a note I never dared to hand her folded inside. We have gone our separate ways, but whenever the opening chime rings, I still smell the sunshine on our school uniforms.',
      createdAt: '2026-08-14T21:18:00.000Z',
      reply: { author: '下雨天借伞的人', enAuthor: 'Rainy Day Umbrella', text: '“走过的路 是一阵魔术”——青春最好的样子，就是我们曾毫无保留地认真过。', enText: '“The road walked was a wave of magic”—the finest part of youth is that we were wholly earnest.' }
    },
    {
      author: '在环岛路吹风', enAuthor: 'Breeze on Coastal Road', likes: 7651,
      text: '在「{place}」的海边骑单车，耳机里正好放着这首歌。海风迎面吹过来，带着微凉的咸味，突然觉得生活里那些让人焦虑的琐事都被海浪冲走了。',
      enText: 'Riding a bicycle along the coast of {placeEn} with this melody in my headphones. The salty sea breeze blew past, and suddenly all the hurried anxieties of daily life washed away with the tide.',
      createdAt: '2026-08-13T19:42:00.000Z',
      reply: { author: '日光岩上的猫', enAuthor: 'Cat on Sunlight Rock', text: '耳机里的周杰伦，眼前的海浪，这才是夏天的意义。', enText: 'Jay Chou in your ears and waves before your eyes—that is the very meaning of summer.' }
    },
    {
      author: '旧书店的留声机', enAuthor: 'Old Bookstore Gramophone', likes: 5820,
      text: '小时候总觉得长大了就能拥有全世界，长大后才发现，最想找回的只是千禧年那个无忧无虑的蝉鸣午后。谢谢这首歌，给成年人留了一个可以随时躲进去的避风港。',
      enText: 'When young, I believed growing up meant having the world. Grown up, I realized all I wanted to recover was that carefree summer afternoon. Thank you for giving adults a shelter to retreat to at any time.',
      createdAt: '2026-08-11T14:30:00.000Z'
    },
    {
      author: '铁盒里的旧车票', enAuthor: 'Old Train Tickets in a Box', likes: 4319,
      text: '抽屉里真有一个生锈的铁盒，里面塞满了大学四年去见你的往返火车票。虽然故事最后没能圆满，但那些在列车上看过的晚霞，我都替你记着。',
      enText: 'I truly have a rusted iron box in my drawer, filled with four years of train tickets between our cities. Though the story had no storybook ending, I still remember all the sunsets seen from those carriage windows for you.',
      createdAt: '2026-08-09T08:15:00.000Z'
    },
    {
      author: '晚自习的倒计时', enAuthor: 'Study Hall Countdown', likes: 3120,
      text: '前奏一响，鸡皮疙瘩立刻起来了。这是刻在我们这代人DNA里的旋律，无论什么时候听，心底都会亮起一盏温柔的灯。',
      enText: 'The opening notes gave me goosebumps instantly. This melody is etched into our generation’s DNA; whenever it plays, a gentle lamp lights up inside.',
      createdAt: '2026-08-07T12:05:00.000Z'
    },
    {
      author: '第三颗纽扣', enAuthor: 'The Third Button', likes: 2185,
      text: '戴上降噪耳机，闭上眼睛，看着3D地球上的光点亮起，仿佛真的乘着热气球飞到了「{place}」的上空。愿每一个赶路的人，今晚都能做一个好梦。',
      enText: 'Put on noise-cancelling headphones, close your eyes, and watch the light glow on the 3D globe. It feels like floating above {placeEn} in a hot-air balloon. May everyone rushing through life tonight have a sweet dream.',
      createdAt: '2026-08-15T02:20:00.000Z'
    }
  ],

  // 2. 约会钢琴曲
  'dating-piano': [
    {
      author: '初雪时的心跳', enAuthor: 'Heartbeat in First Snow', likes: 8940,
      text: '高三那年的晚自习，窗外飘着细雨，我和喜欢的人共用一副有线耳机，一人一只。这首钢琴曲循环了一个晚自习，我们谁都没说话，但心里早已万马奔腾。',
      enText: 'During a study hall in senior year with light rain tapping the window, my crush and I shared a wired earphone, one side each. This piano loop played the whole evening. Neither spoke, yet our hearts galloped like wild horses.',
      createdAt: '2026-08-14T20:15:00.000Z',
      reply: { author: '窗边的银杏树', enAuthor: 'Ginkgo by the Window', text: '最美好的暗恋，是连空气里都藏着琴键的温柔。', enText: 'The sweetest unspoken love is when even the air carries the tenderness of piano keys.' }
    },
    {
      author: '青石板上的水珠', enAuthor: 'Water Drops on Cobblestones', likes: 6732,
      text: '在「{place}」的廊棚下避雨，青石板路被雨水洗得发亮。远处隐约传来这首琴音，忽然懂了为什么古人说“偷得浮生半日闲”。',
      enText: 'Sheltering from rain under the eaves of {placeEn}, the cobblestones shone freshly washed. Hearing this distant piano note, I finally understood the ancient poet’s delight in stealing half a day of leisure from busy life.',
      createdAt: '2026-08-12T16:22:00.000Z'
    },
    {
      author: '下班后的十点半', enAuthor: '10:30 PM After Work', likes: 5120,
      text: '成年人的世界总是很吵，谢谢这首钢琴曲，给了我三分钟可以卸下防备、不用当大人的纯粹时光。',
      enText: 'The grown-up world is always loud. Thank you, piano melody, for giving me three minutes to drop my guard and not have to be an adult.',
      createdAt: '2026-08-10T14:40:00.000Z'
    },
    {
      author: '寄往远方的明信片', enAuthor: 'Postcard to Afar', likes: 3890,
      text: '黑白琴键敲击出的不仅是音符，还有那些说不出口的想念。如果你也正好在深夜听这首曲子，祝你晚安，好梦。',
      enText: 'What the black and white keys strike are not only notes, but unvoiced yearnings. If you happen to be listening late at night as well, goodnight and sweet dreams.',
      createdAt: '2026-08-08T11:05:00.000Z'
    },
    {
      author: '南山南的水仙', enAuthor: 'Narcissus on South Hill', likes: 2450,
      text: '每一次琴音落下，都像一颗小石子投入平静的湖面，泛起层层涟漪。治愈了我今天所有的疲惫。',
      enText: 'Every falling piano note is like a pebble tossed into a tranquil lake, sending gentle ripples across. It has healed all of today’s exhaustion.',
      createdAt: '2026-08-15T05:30:00.000Z'
    }
  ],

  // 3. Time To Love · October
  'time-to-love': [
    {
      author: '雪山上的日照金山', enAuthor: 'Golden Sunrise on Snow Peak', likes: 9230,
      text: '在海拔4600米的山巅，高原的风吹散了层层云雾，主峰突然被朝阳染成了耀眼的金色。耳机里这首《Time To Love》前奏响起的瞬间，眼泪毫无预兆地滑落了下来。大自然的美，真的能洗涤灵魂。',
      enText: 'At 4,600 meters elevation, the alpine wind swept away dense clouds, and the golden sunrise suddenly illuminated the snowy summit. As Time To Love began playing in my headphones, tears streamed down without warning. Nature’s majesty truly cleanses the soul.',
      createdAt: '2026-08-14T23:10:00.000Z',
      reply: { author: '向云端看齐', enAuthor: 'Looking Toward Clouds', text: '愿我们都能在有生之年，勇敢去爱，不留遗憾。', enText: 'May we all love courageously in this lifetime, leaving no regrets behind.' }
    },
    {
      author: '漫步在云端', enAuthor: 'Walking in the Clouds', likes: 7105,
      text: '相爱的时候总以为来日方长，后来才明白，很多告别连一声再见都没有。Time to love，大概就是提醒我们要用力珍惜眼前能握紧的每一双手。',
      enText: 'When in love, we thought we had endless days ahead, only to realize that many goodbyes come without a single farewell word. Time to love simply reminds us to hold tightly to the hands we can grasp right now.',
      createdAt: '2026-08-13T15:20:00.000Z'
    },
    {
      author: '星空露营者', enAuthor: 'Stargazer Camper', likes: 4890,
      text: '在「{place}」的漫天星辰下点燃篝火，银河横跨天际。这首曲子就像星光一样干净清澈，让人觉得活着就是最伟大的奇迹。',
      enText: 'Lighting a campfire under the star-strewn sky of {placeEn}, with the Milky Way spanning the horizon. This piece is as pure as starlight, reminding me that being alive is the greatest miracle.',
      createdAt: '2026-08-10T18:00:00.000Z'
    },
    {
      author: '风吹过垭口', enAuthor: 'Wind Over Mountain Pass', likes: 3240,
      text: '有些旋律是刻在骨子里的，哪怕过了十年，只要一个和弦，就能唤醒一整个青春所有的爱意与向往。',
      enText: 'Certain melodies are carved into bone. Even a decade later, a single chord can awaken all the love and longing of an entire youth.',
      createdAt: '2026-08-08T09:12:00.000Z'
    }
  ],

  // 4. 晚风 & 晚风（纯音乐）
  'evening-breeze': [
    {
      author: '橘色落日收藏家', enAuthor: 'Orange Sunset Collector', likes: 9540,
      text: '傍晚六点半，坐在阳台上看落日一点点沉入地平线，天空从金黄变成淡紫。晚风吹过树梢沙沙作响，那一刻觉得，生活虽然忙碌，但人间依然值得。',
      enText: 'At 6:30 in the evening, sitting on the balcony watching the sun sink below the horizon as the sky turned from gold to lavender. The evening breeze rustled through the treetops, making me feel that despite life’s busyness, the world is deeply worthwhile.',
      createdAt: '2026-08-14T18:50:00.000Z',
      reply: { author: '慢步者', enAuthor: 'Gentle Stroller', text: '去吹吹晚风吧，风会抚平所有的褶皱。', enText: 'Go breathe the evening breeze; the wind smooths out every wrinkle in your heart.' }
    },
    {
      author: '环海路上的单车', enAuthor: 'Bicycle on Lake Road', likes: 6820,
      text: '在「{place}」骑车环湖，耳机里放着《晚风》。风吹起衣角，路边的野花在夕阳下泛着光，所有的疲惫都被甩在了身后。',
      enText: 'Cycling along the waters of {placeEn} listening to Evening Breeze. The wind lifted my jacket, wild roadside flowers glowed in twilight, and all weariness fell behind.',
      createdAt: '2026-08-12T17:35:00.000Z'
    },
    {
      author: '晚霞是天空的信件', enAuthor: 'Twilight is Sky’s Letter', likes: 5210,
      text: '我们总是在急匆匆地赶路，却忘了身旁的晚霞有多温柔。戴上耳机，给生活按下三分钟的慢放键。',
      enText: 'We are always rushing, forgetting how gentle the twilight beside us is. Put on your headphones and press the 3-minute slow-motion button on life.',
      createdAt: '2026-08-09T13:10:00.000Z'
    },
    {
      author: '第三号站台', enAuthor: 'Platform No. 3', likes: 3670,
      text: '旋律里有一股让人安心的力量，就像小时候夏天的傍晚，妈妈喊你回家吃饭的声音。',
      enText: 'The melody holds a deeply reassuring power, just like childhood summer twilights when your mother called you home for dinner.',
      createdAt: '2026-08-07T11:45:00.000Z'
    }
  ],
  'evening-breeze-instrumental': [
    {
      author: '森林深处的小屋', enAuthor: 'Cabin in the Deep Forest', likes: 8430,
      text: '没有歌词的打扰，纯粹的吉他与管乐把森林的幽静与微风的清凉完整地送到了耳边。适合戴上耳机阅读、思考，或者安静地发呆。',
      enText: 'Without vocal distraction, pure guitar and winds deliver the deep forest’s serenity and the cool breeze directly to your ears. Perfect for reading, contemplating, or daydreaming.',
      createdAt: '2026-08-14T19:00:00.000Z',
      reply: { author: '松针与晨露', enAuthor: 'Pine Needles & Morning Dew', text: '听着这首歌，整个房间都仿佛弥漫着松木的清香。', enText: 'Listening to this, the whole room feels filled with the crisp scent of pine wood.' }
    },
    {
      author: '静谧山谷的清泉', enAuthor: 'Spring in Quiet Valley', likes: 6150,
      text: '在「{place}」的古树绿荫下，清泉石上流。这首器乐曲把天地之间的灵动与宁静展现得淋漓尽致。',
      enText: 'Beneath the ancient shade trees of {placeEn}, clear springs flow over stones. This instrumental captures the world’s spirit and peace with effortless grace.',
      createdAt: '2026-08-11T16:15:00.000Z'
    },
    {
      author: '风过林梢', enAuthor: 'Wind Through Treetops', likes: 4290,
      text: '吉他琴弦的每一次震颤，都像一阵穿堂而过的山风，带走了心头所有的燥热与喧嚣。',
      enText: 'Each vibration of the guitar strings is like a mountain breeze blowing through an open hallway, carrying away all inner heat and noise.',
      createdAt: '2026-08-08T10:20:00.000Z'
    }
  ],

  // 5. 太聪明 · 陈绮贞
  'too-smart': [
    {
      author: '雨天的第七个梦', enAuthor: 'Seventh Dream on a Rainy Day', likes: 8870,
      text: '总以为在感情里保持理智和聪明就不会受伤，后来才发现，太聪明的人往往最容易错过真挚的爱。如果能重来一次，我宁愿笨一点，勇敢一点。',
      enText: 'I used to think staying rational and clever in love would prevent hurt, only to realize that the overly clever often miss out on the most genuine love. If I could do it over, I would rather be simpler and braver.',
      createdAt: '2026-08-14T22:45:00.000Z',
      reply: { author: '吉他弦上的尘埃', enAuthor: 'Dust on Guitar Strings', text: '陈老师的声音就像一把温柔的手术刀，轻轻划开伪装，然后温柔地替你包扎。', enText: 'Cheer Chen’s voice is like a gentle scalpel, peeling back armor and then softly bandaging your heart.' }
    },
    {
      author: '深夜便利店', enAuthor: 'Midnight Convenience Store', likes: 6420,
      text: '在大城市闪烁的霓虹灯下，喝着热咖啡。看着「{place}」的光影流转，忽然明白了：最珍贵的聪明，是看清生活后依然热爱它的勇敢。',
      enText: 'Under the neon glow of the metropolis sipping hot coffee while watching {placeEn} sparkle. I finally understood: the truest wisdom is having the courage to love life even after seeing it clearly.',
      createdAt: '2026-08-12T20:10:00.000Z'
    },
    {
      author: '白衬衫上的褶皱', enAuthor: 'Wrinkle on a White Shirt', likes: 4590,
      text: '一把木吉他，一个干净纯粹的声音，唱出所有当代人在喧嚣都市里的隐秘心事。',
      enText: 'One acoustic guitar and one pure voice, singing the secret thoughts of all modern souls wandering the restless city.',
      createdAt: '2026-08-09T15:30:00.000Z'
    }
  ],

  // 6. 云梦 - 为你唱首歌
  'yunmeng-song-for-you': [
    {
      author: '漫游者日记', enAuthor: 'Wanderer’s Journal', likes: 8650,
      text: '走过千山万水，看过浩瀚星空，最后才发现，世间最动人的风景从来不是远方，而是那个愿意放慢脚步、陪你一起听风看海的人。',
      enText: 'Having crossed thousands of mountains and gazed at starry skies, I finally realized that the most breathtaking scenery is never far away—it is the one who slows down to listen to the wind and watch the sea beside you.',
      createdAt: '2026-08-14T21:40:00.000Z',
      reply: { author: '湖畔小木屋', enAuthor: 'Lakeside Wooden Cabin', text: '“为你唱首歌”，愿每一个漂泊的旅人都能找到心灵的归宿。', enText: '“A song for you”—may every wandering traveler find a home for their spirit.' }
    },
    {
      author: '青海湖畔的油菜花', enAuthor: 'Canola Flowers by Qinghai Lake', likes: 6240,
      text: '在「{place}」的湖畔，湛蓝的湖水倒映着雪山与白云。音乐流淌在空气里，感觉整个天地都在为你低声浅唱。',
      enText: 'By the lake of {placeEn}, azure waters mirror snow peaks and ivory clouds. As the music flows, the whole world seems to whisper a gentle song for you.',
      createdAt: '2026-08-11T13:20:00.000Z'
    },
    {
      author: '风停在树梢', enAuthor: 'Wind Rests on Branches', likes: 4180,
      text: '旋律温暖而深情，像冬日里的一杯热可可，悄悄融化了所有的孤独与防备。',
      enText: 'Warm and deeply affectionate, like a cup of hot cocoa on a winter day, softly melting away all loneliness and guard.',
      createdAt: '2026-08-08T08:50:00.000Z'
    }
  ],

  // 7. 面会菜 · 林生祥
  'lin-shengxiang-mianhuicai': [
    {
      author: '大漠孤烟直', enAuthor: 'Desert Smoke & Solitary Wind', likes: 8710,
      text: '一把月琴，几句呢喃，道尽了人间的悲欢离合与底层小人物的质朴温良。真正的艺术从不高高在上，它深深扎根于泥土与人间的烟火之中。',
      enText: 'A moon lute and a few gentle murmurs express all the joys, sorrows, and humble kindness of ordinary lives. True art never looks down from above; it is deeply rooted in soil and daily warmth.',
      createdAt: '2026-08-14T20:30:00.000Z',
      reply: { author: '西北风的呼啸', enAuthor: 'Northwest Gale', text: '在苍茫天地间听生祥，才懂什么叫直击灵魂的厚重。', enText: 'Listening to Sheng-Xiang between vast earth and sky reveals the soul-stirring weight of life.' }
    },
    {
      author: '戈壁上的胡杨树', enAuthor: 'Poplar on Gobi Sands', likes: 6390,
      text: '行驶在「{place}」一望无际的荒原戈壁上，窗外是苍茫无垠的落日大漠。这首曲子响起的瞬间，苍凉与坚韧在心底油然而生。',
      enText: 'Driving through the boundless wilderness of {placeEn} with the vast desert sunset outside. When this song plays, a deep sense of resilience and timelessness rises within.',
      createdAt: '2026-08-12T18:15:00.000Z'
    },
    {
      author: '岁月的留白', enAuthor: 'Margins of Time', likes: 4720,
      text: '听懂这首歌的时候，往往已经尝过了生活的酸甜苦辣。但歌声里从不只有苦难，还有苦难中生出的倔强与诗意。',
      enText: 'When you truly understand this song, you have likely tasted life’s bittersweet flavors. Yet it holds not only hardship, but stubborn poetic strength born from it.',
      createdAt: '2026-08-09T11:40:00.000Z'
    }
  ]
};
