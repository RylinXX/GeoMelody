export const SCENIC_SPOTS = [
  // ==================== 1. 江南古镇 & 历史名胜 (Towns & Historic Villages) ====================
  {
    id: 'wuzhen',
    name: '乌镇水乡',
    enName: 'Wuzhen Water Town',
    location: '中国 · 浙江嘉兴',
    country: '中国',
    category: 'town',
    lat: 30.7439,
    lng: 120.4842,
    description: '青石板巷，摇橹船桨划破一池春水。白墙黛瓦掩映在江南烟雨之中，廊棚之下，听雨落乌篷，时光在此慢了下来。',
    tags: ['小桥流水', '烟雨江南', '乌篷船', '治愈慢生活'],
    photos: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 68,
      scale: '五声羽调 · 432Hz',
      instruments: '古筝 · 竹笛 · 细雨滴檐 · 摇橹声',
      naturalSound: 'rain',
      prompt: '国风、古筝、竹笛、轻柔舒缓、BPM68、烟雨治愈、无歌词纯器乐、水流滴答'
    }
  },
  {
    id: 'zhouzhuang',
    name: '周庄古镇',
    enName: 'Zhouzhuang Ancient Town',
    location: '中国 · 江苏苏州',
    country: '中国',
    category: 'town',
    lat: 31.1158,
    lng: 120.8522,
    description: '君到姑苏见，人家尽枕河。双桥横跨流水，夜幕低垂时分，红灯笼映红了水巷波光，琴音悠扬拂过心弦。',
    tags: ['水乡泽国', '双桥夜色', '吴侬软语', '古桥倒影'],
    photos: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 72,
      scale: '五声商调 · 姑苏韵',
      instruments: '琵琶 · 洞箫 · 柔弦微波',
      naturalSound: 'rain',
      prompt: '中国风古典琵琶与箫，轻柔微风，水波荡漾，静谧放松，纯乐器'
    }
  },
  {
    id: 'hongcun',
    name: '宏村古村落',
    enName: 'Hongcun Village',
    location: '中国 · 安徽黄山',
    country: '中国',
    category: 'town',
    lat: 29.9961,
    lng: 117.9904,
    description: '中国画里的乡村。月沼如镜倒映徽派马头墙，晨雾轻笼南湖，水圳穿街过巷，宛若一幅淡雅的水墨长卷。',
    tags: ['水墨徽州', '月沼倒影', '马头墙', '东方美学'],
    photos: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1599818817208-16386b86cfbe?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 65,
      scale: '五声宫调 · 墨意',
      instruments: '古琴 · 埙 · 水流与远山清钟',
      naturalSound: 'bell',
      prompt: '徽州水墨意境、古琴独奏、埙、沉浸空灵、清晨雾气、深沉治愈'
    }
  },
  {
    id: 'fenghuang',
    name: '凤凰古城',
    enName: 'Fenghuang Ancient Town',
    location: '中国 · 湖南湘西',
    country: '中国',
    category: 'town',
    lat: 27.9535,
    lng: 109.6015,
    description: '沱江两岸吊脚楼巍然伫立，虹桥飞跨碧波之上。薄雾笼罩下的边城，承载着沈从文笔下的湘西浪漫与往事。',
    tags: ['沱江泛舟', '吊脚楼', '边城往事', '苗疆风情'],
    photos: [
      'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 70,
      scale: '苗岭调 · 湘西韵',
      instruments: '芦笙微鸣 · 木吉他 · 沱江水声',
      naturalSound: 'wind',
      prompt: '湘西民谣纯音、木吉他与芦笙、流水潺潺、怀旧治愈、清澈温和'
    }
  },
  {
    id: 'lijiang',
    name: '丽江古城',
    enName: 'Old Town of Lijiang',
    location: '中国 · 云南丽江',
    country: '中国',
    category: 'town',
    lat: 26.8721,
    lng: 100.2289,
    description: '玉龙雪山脚下的纳西古国，玉河水分三枝穿城而过。沿溪杨柳拂面，四方街茶香四溢，手鼓轻敲慢度悠然韶光。',
    tags: ['纳西古乐', '玉河柳荫', '四方街', '慵懒阳光'],
    photos: [
      'https://images.unsplash.com/photo-1527684651001-731c474bbb5a?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 76,
      scale: '纳西和弦 · 温暖阳光',
      instruments: '木吉他 · 手碟 · 葫芦丝 · 流水声',
      naturalSound: 'wind',
      prompt: '云南慢调民谣、手碟与木吉他、葫芦丝、慵懒下午茶、阳光治愈'
    }
  },
  {
    id: 'nanxun',
    name: '南浔古镇 · 辑里丝香',
    enName: 'Nanxun Ancient Town',
    location: '中国 · 浙江湖州',
    country: '中国',
    category: 'town',
    lat: 30.8753,
    lng: 120.4282,
    description: '百间楼依河而筑，江南水乡与西洋折衷建筑奇妙融合。清晨阿婆在石桥边浣洗，橹声唉乃穿过小桥，静谧清雅。',
    tags: ['百间楼', '中西合璧', '丝绸古镇', '清雅脱俗'],
    photos: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 66,
      scale: '江南丝竹调',
      instruments: '二胡 · 琵琶 · 潺潺流水 · 丝竹合奏',
      naturalSound: 'rain',
      prompt: '江南丝竹古乐、琵琶与二胡轻拂、小桥流水人家、清雅闲适'
    }
  },
  {
    id: 'xitang',
    name: '西塘古镇 · 烟雨长廊',
    enName: 'Xitang Water Town',
    location: '中国 · 浙江嘉善',
    country: '中国',
    category: 'town',
    lat: 30.9450,
    lng: 120.8910,
    description: '千米烟雨长廊遮风挡雨，弄堂深处传来江南小调。薄雾升起，河灯随波逐流，载着对远方的静谧祝愿。',
    tags: ['烟雨长廊', '石皮弄', '送子来凤桥', '悠然江南'],
    photos: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 68,
      scale: '五声角调 · 烟波浩渺',
      instruments: '竹笛 · 古筝轻捻 · 细雨润物',
      naturalSound: 'rain',
      prompt: '西塘烟雨长廊古风纯音、古筝与竹笛、细雨霏霏、水波荡漾、静心'
    }
  },
  {
    id: 'wuyuan',
    name: '婺源篁岭 · 晒秋梯田',
    enName: 'Wuyuan Huangling Village',
    location: '中国 · 江西上饶',
    country: '中国',
    category: 'town',
    lat: 29.3300,
    lng: 118.1500,
    description: '挂在山崖上的徽州古村。每逢秋收，红辣椒与金色玉米晾晒在竹匾之中，与粉墙黛瓦、金黄梯田交织成浓烈的丰收田园诗。',
    tags: ['最美乡村', '梯田花海', '徽派晒秋', '山野田园'],
    photos: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 72,
      scale: '田园五声调 · 暖阳',
      instruments: '木吉他指弹 · 竹笛清音 · 鸟鸣山幽',
      naturalSound: 'birds',
      prompt: '乡村民谣纯器乐、木吉他与清脆笛声、田园风光、丰收阳光、治愈'
    }
  },
  {
    id: 'pingyao',
    name: '平遥古城 · 晋商岁月',
    enName: 'Pingyao Ancient City',
    location: '中国 · 山西晋中',
    country: '中国',
    category: 'town',
    lat: 37.2025,
    lng: 112.1756,
    description: '保存最为完好的明清汉民族古城。高耸雄伟的古城墙、鳞次栉比的票号镖局，青砖灰瓦见证着数百年前晋商汇通天下的辉煌岁月。',
    tags: ['明清古城', '晋商故里', '古城墙', '厚重历史'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 64,
      scale: '北方宫商调 · 沧桑宏阔',
      instruments: '古琴 · 编钟泛音 · 城楼长风',
      naturalSound: 'bell',
      prompt: '北方古城历史感纯乐、古琴与编钟微音、厚重沧桑、古道悠悠'
    }
  },
  {
    id: 'kyoto',
    name: '京都 · 二年坂与清水寺',
    enName: 'Kyoto Ninenzaka & Kiyomizu',
    location: '日本 · 京都府',
    country: '日本',
    category: 'town',
    lat: 34.9949,
    lng: 135.7850,
    description: '青石阶梯两侧林立着百年町屋木阁，八坂之塔静静矗立在黄昏晚霞中。僧侣晚钟回荡在山峦枫林间，时间在禅意中缓缓驻足。',
    tags: ['京都禅韵', '八坂之塔', '町屋古道', '风雅晚钟'],
    photos: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 60,
      scale: '日式雅乐调 · 432Hz',
      instruments: '尺八 · 日本筝 · 晚钟鸣响 · 庭院水竹滴水',
      naturalSound: 'bell',
      prompt: '京都禅意古典纯乐、尺八与日本筝、寺庙晚钟、竹水滴水、静心专注'
    }
  },
  {
    id: 'shirakawago',
    name: '白川乡合掌村',
    enName: 'Shirakawa-go Village',
    location: '日本 · 岐阜县',
    country: '日本',
    category: 'town',
    lat: 36.2572,
    lng: 136.9064,
    description: '宛如童话森林般的茅草合掌造屋舍，隐匿在群山叠翠与冬日暖雪之间。炊烟袅袅，抚平世俗的喧嚣。',
    tags: ['合掌造', '童话山村', '日式风吕', '世外桃源'],
    photos: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 64,
      scale: '日式In-sen调 · 宁静',
      instruments: '尺八 · 钢片琴 · 微风风铃 · 温暖和弦',
      naturalSound: 'wind',
      prompt: '日式禅意环境音、尺八与温暖钢琴、风铃微动、木屋炊烟、治愈安眠'
    }
  },
  {
    id: 'hallstatt',
    name: '哈尔施塔特湖畔小镇',
    enName: 'Hallstatt Lakeside Village',
    location: '奥地利 · 萨尔茨卡默古特',
    country: '奥地利',
    category: 'town',
    lat: 47.5622,
    lng: 13.6493,
    description: '依山傍水的阿尔卑斯明珠。木屋层叠倒映在碧绿的湖光中，天鹅划开微波，仿佛掉进了欧洲古典童话之中。',
    tags: ['童话小镇', '阿尔卑斯湖泊', '木屋花台', '古典浪漫'],
    photos: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 72,
      scale: 'Acoustic Folk · D Major',
      instruments: '原声大提琴 · 竖琴 · 湖水拍岸',
      naturalSound: 'ocean',
      prompt: '欧洲湖畔小镇古典纯乐、竖琴与提琴、宁静湖水、晨光洒落、唯美浪漫'
    }
  },
  {
    id: 'florence',
    name: '佛罗伦萨 · 阿尔诺河老桥',
    enName: 'Florence Ponte Vecchio',
    location: '意大利 · 托斯卡纳',
    country: '意大利',
    category: 'town',
    lat: 43.7687,
    lng: 11.2531,
    description: '文艺复兴的心脏。阿尔诺河在老桥下静静流淌，圣母百花大教堂的红色穹顶沐浴在托斯卡纳的金色夕阳中，散发着诗性光辉。',
    tags: ['文艺复兴', '老桥晚霞', '托斯卡纳', '古典艺术'],
    photos: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 68,
      scale: 'Renaissance Romance · G Major',
      instruments: '羽管键琴 · 古典提琴 · 河水微漾',
      naturalSound: 'ocean',
      prompt: '意大利托斯卡纳古典器乐、大提琴与小提琴、文艺复兴浪漫、黄昏夕阳'
    }
  },

  // ==================== 2. 雪山高原 (Snow Mountains & Highlands) ====================
  {
    id: 'meili',
    name: '梅里雪山 · 卡瓦格博',
    enName: 'Meili Snow Mountain',
    location: '中国 · 云南德钦',
    country: '中国',
    category: 'mountain',
    lat: 28.4372,
    lng: 98.6836,
    description: '神圣不可侵犯的十三峰，当第一缕金色晨光洒在主峰卡瓦格博雪顶，日照金山的壮美足以震撼每一个瞻仰者的灵魂。',
    tags: ['日照金山', '雪山之神', '藏传朝圣', '神圣静谧'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 56,
      scale: '432Hz 颂钵 Pad · 降E大调',
      instruments: '西藏颂钵 · 环境氛围合成器 · 远山松风 · 铜钦低音',
      naturalSound: 'wind',
      prompt: '空灵辽阔雪山、西藏颂钵、低沉合成器Pad、日照金山神圣感、低节奏深度冥想'
    }
  },
  {
    id: 'yulong',
    name: '玉龙雪山 · 蓝月谷',
    enName: 'Jade Dragon Snow Mountain',
    location: '中国 · 云南丽江',
    country: '中国',
    category: 'mountain',
    lat: 27.1084,
    lng: 100.2458,
    description: '十三座银峰晶莹连绵如玉龙腾跃。山脚下蓝月谷水如凝碧宝石，雪水潺潺流过白水台，清澈透亮沁人心脾。',
    tags: ['蓝月谷', '冰川公园', '纳西神山', '雪山倒影'],
    photos: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 60,
      scale: '清澈高原调 · C大调',
      instruments: '清脆钢琴 · 冰晶音色 · 谷间清风',
      naturalSound: 'wind',
      prompt: '晶莹清澈的雪山钢琴曲、空灵冰晶音色、流水与微风、纯净专注背景乐'
    }
  },
  {
    id: 'kailash',
    name: '冈仁波齐 · 万山之祖',
    enName: 'Mount Kailash',
    location: '中国 · 西藏阿里',
    country: '中国',
    category: 'mountain',
    lat: 31.0667,
    lng: 81.3125,
    description: '世界的中心，众神的居所。金字塔般的对称雪峰耸立在苍穹之上，经幡在狂风中猎猎作响，转山者的脚步沉稳而坚定。',
    tags: ['世界中心', '转山朝圣', '神圣金字塔', '极致空灵'],
    photos: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 52,
      scale: '528Hz 宇宙共振 · 无调性',
      instruments: '深沉回响颂钵 · 经幡狂风 · 低频共鸣',
      naturalSound: 'wind',
      prompt: '西藏神山阿里无人区氛围音乐、528Hz冥想颂钵、深邃宇宙回响、无节拍纯静心'
    }
  },
  {
    id: 'yading',
    name: '稻城亚丁 · 仙乃日三神山',
    enName: 'Daocheng Yading',
    location: '中国 · 四川甘孜',
    country: '中国',
    category: 'mountain',
    lat: 28.3842,
    lng: 100.3475,
    description: '仙乃日、央迈勇、夏诺多吉三座神山护佑着牛奶海与五色海。草甸金黄，溪流清冽，仿佛遗落在人间的香格里拉。',
    tags: ['香格里拉', '牛奶海', '三怙主神山', '绝美秋色'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 62,
      scale: '高原民谣 · G大调',
      instruments: '清脆木吉他 · 空灵弦乐组 · 高原鹰鸣',
      naturalSound: 'wind',
      prompt: '香格里拉原生态纯音乐、木吉他与宽广弦乐、高原微风、治愈释放'
    }
  },
  {
    id: 'gongga',
    name: '贡嘎雪山 · 蜀山之王',
    enName: 'Mount Gongga (Minya Konka)',
    location: '中国 · 四川康定',
    country: '中国',
    category: 'mountain',
    lat: 29.5958,
    lng: 101.8797,
    description: '海拔7556米的蜀山之王，金字塔状的主峰直插天际。海螺沟冰瀑布宛若银河凝固倾泻，冷嘎措倒映着无与伦比的雪山圣影。',
    tags: ['蜀山之王', '海螺沟冰川', '冷嘎措倒影', '巍峨险峻'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 54,
      scale: '川西高原调 · 宽广宏大',
      instruments: '大提琴低鸣 · 高原长号 · 冰川风啸',
      naturalSound: 'wind',
      prompt: '贡嘎雪山宏伟交响氛围乐、大提琴长弓、冰川呼啸风声、广袤壮丽'
    }
  },
  {
    id: 'siguniang',
    name: '四姑娘山 · 东方圣山',
    enName: 'Mount Siguniang (Four Sisters)',
    location: '中国 · 四川阿坝小金',
    country: '中国',
    category: 'mountain',
    lat: 31.1111,
    lng: 102.9028,
    description: '四座白雪皑皑的山峰亭亭玉立在长坪沟与双桥沟上方。草甸、红杉、沙棘林环绕，被誉为东方的阿尔卑斯。',
    tags: ['东方阿尔卑斯', '双桥沟', '攀冰圣地', '纯净草甸'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 64,
      scale: 'Acoustic Nature · E Major',
      instruments: '原声民谣吉他 · 溪流潺潺 · 冰雪微风',
      naturalSound: 'wind',
      prompt: '四姑娘山清新民谣纯乐、原声吉他、山间溪流、阳光松林、放松惬意'
    }
  },
  {
    id: 'everest',
    name: '珠穆朗玛峰 · 世界之巅',
    enName: 'Mount Everest (Qomolangma)',
    location: '中国/尼泊尔 · 日喀则定日',
    country: '中国',
    category: 'mountain',
    lat: 27.9881,
    lng: 86.9250,
    description: '海拔8848.86米的世界屋脊。绒布寺前仰望巨大的北壁金字塔，在八千米之上的狂风与稀薄空气中，感受对大自然最极致的敬畏。',
    tags: ['世界之巅', '珠峰大本营', '日照金山', '极限之境'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 50,
      scale: 'Epic Drone · 432Hz',
      instruments: '宇宙深空合成器 · 极低频风鸣 · 西藏铜钦',
      naturalSound: 'wind',
      prompt: '世界屋脊珠穆朗玛峰史诗氛围音乐、极低频风鸣、深邃宇宙回响、震撼敬畏'
    }
  },
  {
    id: 'fuji',
    name: '富士山 · 富士五湖',
    enName: 'Mount Fuji & Fuji Five Lakes',
    location: '日本 · 山梨/静冈',
    country: '日本',
    category: 'mountain',
    lat: 35.3606,
    lng: 138.7274,
    description: '完美的对称火山锥，山顶终年白雪皑皑。河口湖畔樱花盛开或红叶满山，倒影在宁静的湖面中，静谧祥和。',
    tags: ['逆富士', '樱花雪峰', '日式极简', '河口湖畔'],
    photos: [
      'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 60,
      scale: '日式雅乐调 · 432Hz',
      instruments: '日本筝 · 柔美长笛 · 湖面微风',
      naturalSound: 'wind',
      prompt: '富士山日式禅乐、日本筝与清柔长笛、微风拂过湖水、静心专注'
    }
  },
  {
    id: 'matterhorn',
    name: '马特洪峰 · 阿尔卑斯之巅',
    enName: 'Matterhorn Alpine Peak',
    location: '瑞士 · 采尔马特',
    country: '瑞士',
    category: 'mountain',
    lat: 45.9763,
    lng: 7.6586,
    description: '阿尔卑斯山脉中最具辨识度的锥形巨峰。清晨第一缕阳光将其点燃成金色火炬，里弗尔湖中倒映着孤傲的身影。',
    tags: ['阿尔卑斯之王', '黄金日出', '冰川列车', '极致壮阔'],
    photos: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 58,
      scale: 'Epic Ambient · D Minor',
      instruments: '温暖圆号长音 · 空间合成器Pad · 冰川风啸',
      naturalSound: 'wind',
      prompt: '瑞士阿尔卑斯山宏伟纯音乐、温暖圆号与空间Pad、清冷辽阔、沉浸式静谧'
    }
  },
  {
    id: 'lofoten',
    name: '罗弗敦群岛 · 极光与雪山',
    enName: 'Lofoten Islands & Aurora',
    location: '挪威 · 诺尔兰郡',
    country: '挪威',
    category: 'mountain',
    lat: 68.2354,
    lng: 13.6263,
    description: '北极圈内的壮丽峡湾与险峻雪峰。红色渔屋矗立在冰海之滨，冬季绿色的北极光在繁星与雪巅上跳起天幕之舞。',
    tags: ['北极极光', '峡湾雪峰', '红色渔屋', '极夜奇观'],
    photos: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_ambient',
      bpm: 56,
      scale: 'Nordic Drone · E Minor',
      instruments: '北欧大提琴 · 极光音效Pad · 北冰洋拍岸浪',
      naturalSound: 'ocean',
      prompt: '北欧极光氛围纯音乐、空灵大提琴、冰洋微浪、清冷神圣、助眠冥想'
    }
  },

  // ==================== 3. 热带海岛 (Tropical Islands & Oceans) ====================
  {
    id: 'sanya',
    name: '三亚蜈支洲岛 · 蔚蓝之境',
    enName: 'Sanya Wuzhizhou Island',
    location: '中国 · 海南三亚',
    country: '中国',
    category: 'island',
    lat: 18.3142,
    lng: 109.7618,
    description: '中国版马尔代夫。果冻般通透的蔚蓝海水轻抚细白沙滩，椰林随海风婆娑起舞，落日将整片天空染成蜜桃粉金。',
    tags: ['果冻海', '椰梦长廊', '热带落日', '海边度假'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'island_breeze',
      bpm: 72,
      scale: 'Bossa Nova · F Major',
      instruments: '轻快尼龙吉他 · 柔美电钢琴 · 潮汐白噪音 · 椰林风声',
      naturalSound: 'ocean',
      prompt: '热带海岛Bossa Nova纯乐、轻快尼龙吉他、柔美电钢琴、真实海浪潮汐、夏日治愈'
    }
  },
  {
    id: 'weizhou',
    name: '涠洲岛 · 火山岩鳄鱼山',
    enName: 'Weizhou Island Volcano Coast',
    location: '中国 · 广西北海',
    country: '中国',
    category: 'island',
    lat: 21.0500,
    lng: 109.1167,
    description: '中国最大最年轻的火山岛。黑色玄武岩海蚀崖壁与翡翠色海水激烈碰撞，暮崖落日将无边大海照耀得金光灿烂。',
    tags: ['火山地质', '暮崖日落', '海蚀奇观', '南国海岛'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'island_breeze',
      bpm: 68,
      scale: 'Sunset Acoustic · G Major',
      instruments: '原声吉他扫弦 · 潮汐微澜 · 南国海风',
      naturalSound: 'ocean',
      prompt: '海岛黄昏吉他民谣纯乐、海浪拍岸、温暖夕阳、松弛自得'
    }
  },
  {
    id: 'maldives',
    name: '马尔代夫 · 蓝色环礁',
    enName: 'Maldives Atolls',
    location: '马尔代夫 · 印度洋',
    country: '马尔代夫',
    category: 'island',
    lat: 3.2028,
    lng: 73.2207,
    description: '印度洋上的花环。水上屋悬浮于翡翠般的泻湖之上，五彩斑斓的珊瑚礁与热带鱼环绕，躺在吊床上聆听潮起潮落。',
    tags: ['印度洋珍珠', '水上木屋', '珊瑚礁泻湖', '极致松弛'],
    photos: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'island_breeze',
      bpm: 66,
      scale: 'Chill Ambient · C Major',
      instruments: '柔和Rhodes钢琴 · 舒缓海浪 · 尤克里里微音',
      naturalSound: 'ocean',
      prompt: '海岛度假极简氛围音乐、Rhodes电钢琴和弦、慢节奏海浪涌动、无忧无虑松弛'
    }
  },
  {
    id: 'bali',
    name: '巴厘岛 · 乌鲁瓦图断崖',
    enName: 'Bali Uluwatu Cliff',
    location: '印度尼西亚 · 巴厘岛',
    country: '印度尼西亚',
    category: 'island',
    lat: -8.8291,
    lng: 115.0849,
    description: '情人崖下惊涛拍岸，壮丽的印度洋夕阳在此沉入海平线。晚霞将天空染成紫金与熔铜，海浪声回荡在悬崖古寺之间。',
    tags: ['情人崖夕阳', '印度洋巨浪', '巴厘神庙', '心灵庇护所'],
    photos: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'island_breeze',
      bpm: 70,
      scale: 'Gamelan Fusion · 温暖E调',
      instruments: '竹琴加美兰 · 原声吉他 · 巨浪拍击',
      naturalSound: 'ocean',
      prompt: '巴厘岛异域清雅器乐、加美兰金属微音、木吉他扫弦、海浪撞击悬崖、黄昏氛围'
    }
  },
  {
    id: 'santorini',
    name: '圣托里尼 · 伊亚爱琴海',
    enName: 'Santorini Oia & Aegean Sea',
    location: '希腊 · 基克拉泽斯群岛',
    country: '希腊',
    category: 'island',
    lat: 36.4618,
    lng: 25.3753,
    description: '蓝顶教堂与纯白洞穴屋依火山口悬崖而建。俯瞰深邃无垠的爱琴海，全世界最迷人的落日在这里徐徐谢幕。',
    tags: ['爱琴海日落', '蓝白小镇', '悬崖火山口', '地中海之梦'],
    photos: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'island_breeze',
      bpm: 74,
      scale: 'Mediterranean Acoustic · D Major',
      instruments: '曼陀林 · 尼龙古典吉他 · 地中海海风',
      naturalSound: 'ocean',
      prompt: '地中海浪漫古典吉他与曼陀林、轻柔海浪拍打岩石、夏日微风、明朗治愈'
    }
  },
  {
    id: 'semporna',
    name: '仙本那 · 玻璃海与巴瑶水上屋',
    enName: 'Semporna Glass Ocean',
    location: '马来西亚 · 沙巴州',
    country: '马来西亚',
    category: 'island',
    lat: 4.4812,
    lng: 118.6112,
    description: '船只宛如悬浮在纯净透明的玻璃海上。海上游牧民族巴瑶人的高脚木屋伫立在碧波之中，远离陆地喧嚣。',
    tags: ['悬浮玻璃海', '巴瑶族', '潜水天堂', '透明泻湖'],
    photos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'island_breeze',
      bpm: 64,
      scale: 'Crystal Breeze · C Major',
      instruments: '清脆木琴 · 尤克里里 · 水波微音',
      naturalSound: 'ocean',
      prompt: '热带玻璃海清爽纯音乐、木琴叮咚、海浪清澈、透明阳光'
    }
  },
  {
    id: 'borabora',
    name: '波拉波拉岛 · 太平洋珍珠',
    enName: 'Bora Bora Lagoon',
    location: '法属波利尼西亚 · 太平洋',
    country: '法属波利尼西亚',
    category: 'island',
    lat: -16.5004,
    lng: -151.7415,
    description: '死火山奥特马努峰高耸在渐变七彩泻湖中央。水上木屋直通温暖清澈的珊瑚海，被誉为太平洋上最接近天堂的地方。',
    tags: ['七彩泻湖', '水上草屋', '火山泻湖', '奢华避世'],
    photos: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'island_breeze',
      bpm: 62,
      scale: 'Polynesian Chill · F Major',
      instruments: '柔音电钢琴 · 尤克里里和弦 · 温暖海浪',
      naturalSound: 'ocean',
      prompt: '南太平洋波利尼西亚风情纯音、电钢琴与海浪和声、度假放松、深层释压'
    }
  },

  // ==================== 4. 西北大漠 (Deserts & Canyons) ====================
  {
    id: 'dunhuang',
    name: '敦煌鸣沙山 · 月牙泉',
    enName: 'Dunhuang Crescent Spring',
    location: '中国 · 甘肃敦煌',
    country: '中国',
    category: 'desert',
    lat: 40.0863,
    lng: 94.6681,
    description: '沙泉共处千百年，月牙一湾碧水深藏大漠腹地。落日西下，驼铃声声回荡在漫漫丝绸之路上，大漠孤烟尽显苍凉壮美。',
    tags: ['沙水共生', '丝路驼铃', '大漠孤烟', '千年绝唱'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_strings',
      bpm: 64,
      scale: '西北羽调 · 悠远凄美',
      instruments: '大提琴 · 埙 · 驼铃轻摇 · 荒漠风沙',
      naturalSound: 'wind',
      prompt: '丝绸之路大漠苍凉纯音乐、大提琴独奏、埙与远古驼铃、风沙呼啸、深沉辽阔'
    }
  },
  {
    id: 'shapotou',
    name: '中卫沙坡头 · 黄河九曲',
    enName: 'Zhongwei Shapotou & Yellow River',
    location: '中国 · 宁夏中卫',
    country: '中国',
    category: 'desert',
    lat: 37.4984,
    lng: 104.9654,
    description: '腾格里沙漠与滔滔黄河在此绝美相拥。大漠孤烟直，长河落日圆的千古诗境在此化为真实，羊皮筏子顺流东下。',
    tags: ['大漠黄河', '腾格里沙漠', '长河落日', '羊皮筏子'],
    photos: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_strings',
      bpm: 66,
      scale: '秦腔哀调变奏 · D Minor',
      instruments: '马头琴 · 板胡柔音 · 黄河滔滔水声',
      naturalSound: 'wind',
      prompt: '大河与沙漠交汇壮阔乐曲、马头琴悠扬、长河落日意境、苍茫大气'
    }
  },
  {
    id: 'taklamakan',
    name: '塔克拉玛干 · 死亡之海胡杨林',
    enName: 'Taklamakan Desert & Poplar Forest',
    location: '中国 · 新疆巴音郭楞',
    country: '中国',
    category: 'desert',
    lat: 39.0000,
    lng: 83.0000,
    description: '浩瀚无垠的金色沙海，千年不死的胡杨林坚毅伫立。秋风吹过，满目金黄如烈火燃烧，诉说着亘古荒原的生命奇迹。',
    tags: ['死亡之海', '千年胡杨', '金色沙海', '坚毅生命'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_strings',
      bpm: 60,
      scale: '西域木卡姆调 · 苍茫',
      instruments: '热瓦普微音 · 低音弦乐 · 广袤风声',
      naturalSound: 'wind',
      prompt: '新疆西域沙漠纯器乐、热瓦普与大提琴交织、千年胡杨苍茫之美、专注沉思'
    }
  },
  {
    id: 'kumtag',
    name: '库木塔格沙漠 · 城中沙山',
    enName: 'Kumtag Desert',
    location: '中国 · 新疆吐鲁番鄯善',
    country: '中国',
    category: 'desert',
    lat: 42.8500,
    lng: 90.2333,
    description: '世界上唯一与城市相连的沙漠。金色羽状沙丘起伏连绵，夕阳下的沙脊线如刀锋般优美流畅，千百年绿洲与黄沙相安无事。',
    tags: ['羽状沙丘', '大漠绿洲', '落日余晖', '丝路风情'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_strings',
      bpm: 62,
      scale: '丝路羽调 · D Minor',
      instruments: '手鼓柔击 · 琵琶泛音 · 苍茫风声',
      naturalSound: 'wind',
      prompt: '丝绸之路西域风情纯乐、柔和手鼓与琵琶、金色沙丘晚霞、冥想沉浸'
    }
  },
  {
    id: 'sahara',
    name: '撒哈拉沙漠 · 星空之夜',
    enName: 'Sahara Desert & Starry Night',
    location: '摩洛哥 · 梅尔祖卡',
    country: '摩洛哥',
    category: 'desert',
    lat: 31.0801,
    lng: -4.0133,
    description: '全球最大的沙海，巨大的红色沙丘在月光下如凝固的浪涛。夜幕降临，整个银河如瀑布般倾泻而下，天地间只余寂静。',
    tags: ['撒哈拉星空', '红色沙丘', '游牧星宿', '宇宙孤寂'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_strings',
      bpm: 54,
      scale: 'Ambient Desert · E Minor',
      instruments: '乌德琴 · 氛围合成器 · 夜风微啸 · 篝火余烬',
      naturalSound: 'campfire',
      prompt: '撒哈拉沙漠璀璨星空氛围乐、乌德琴轻拨、篝火劈啪、深邃宇宙感、助眠冥想'
    }
  },
  {
    id: 'grandcanyon',
    name: '科罗拉多大峡谷',
    enName: 'Grand Canyon National Park',
    location: '美国 · 亚利桑那州',
    country: '美国',
    category: 'desert',
    lat: 36.1069,
    lng: -112.1129,
    description: '地球上最壮丽的裂痕。数亿年河流冲刷出的红岩断层层峦叠嶂，晨昏光影交织在峭壁之间，令人叹服大自然的鬼斧神工。',
    tags: ['地球裂痕', '红岩地貌', '壮阔峡谷', '地质奇观'],
    photos: [
      'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_strings',
      bpm: 68,
      scale: 'Western Acoustic · G Major',
      instruments: '原声民谣吉他 · 口琴低吟 · 峡谷风声',
      naturalSound: 'wind',
      prompt: '美西大峡谷原声吉他与口琴、旷野公路旅行、辽阔红岩地貌、自由舒畅'
    }
  },
  {
    id: 'wadirum',
    name: '瓦迪拉姆 · 月亮峡谷',
    enName: 'Wadi Rum Desert',
    location: '约旦 · 亚喀巴省',
    country: '约旦',
    category: 'desert',
    lat: 29.5734,
    lng: 35.4333,
    description: '火星般的红色沙漠与高耸的砂岩巨石。贝都因人的帐篷在星空下静默，宛若置身科幻史诗电影中的异星世界。',
    tags: ['火星地表', '月亮峡谷', '贝都因星夜', '异星秘境'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_strings',
      bpm: 58,
      scale: 'Sci-Fi Ambient · Phrygian Mode',
      instruments: '中东达布卡柔拍 · 空间合成器长音 · 荒原风鸣',
      naturalSound: 'wind',
      prompt: '异星沙漠电影原声氛围乐、神秘弗里吉亚调式、空间回响、静谧辽阔'
    }
  },

  // ==================== 5. 森林秘境 (Forests & Natural Parks) ====================
  {
    id: 'zhangjiajie',
    name: '张家界 · 悬浮天子山',
    enName: 'Zhangjiajie National Forest',
    location: '中国 · 湖南张家界',
    country: '中国',
    category: 'forest',
    lat: 29.3444,
    lng: 110.4348,
    description: '阿凡达潘多拉星球的原型。三千座石英砂岩峰林拔地而起，云雾缭绕在悬崖峭壁间，宛若悬浮于云海之上的仙界秘境。',
    tags: ['潘多拉星球', '悬浮峰林', '云海仙境', '百龙天梯'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 64,
      scale: '空灵五声羽调 · 432Hz',
      instruments: '竹笛 · 竖琴泛音 · 云海清风 · 灵鸟啼鸣',
      naturalSound: 'birds',
      prompt: '张家界仙境竹笛与竖琴、云雾缭绕峰林、鸟鸣清脆、空灵悠扬纯音乐'
    }
  },
  {
    id: 'jiuzhaigou',
    name: '九寨沟 · 五彩童话森林',
    enName: 'Jiuzhaigou Valley',
    location: '中国 · 四川阿坝',
    country: '中国',
    category: 'forest',
    lat: 33.2600,
    lng: 103.9186,
    description: '九寨归来不看水。翠海、叠瀑、彩林与雪峰交相辉映，倒木沉于水底依然清晰可辨，五花海的池水在阳光下幻化出七彩光芒。',
    tags: ['九寨童话', '五彩池', '诺日朗瀑布', '水景之王'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 70,
      scale: 'Pristine Nature · G Major',
      instruments: '清脆木吉他指弹 · 溪流水滴 · 柔和弦乐',
      naturalSound: 'birds',
      prompt: '九寨沟五彩水景指弹木吉他、清泉石上流、鸟鸣山幽、晶莹剔透治愈乐'
    }
  },
  {
    id: 'changbai',
    name: '长白山 · 原始针叶林与瀑布',
    enName: 'Changbai Mountain Forest',
    location: '中国 · 吉林延边',
    country: '中国',
    category: 'forest',
    lat: 42.0000,
    lng: 128.0500,
    description: '东北第一高峰下的茫茫林海。红松与白桦林遮天蔽日，温泉水在苔藓岩石间冒着白气，长白瀑布从天池缺口飞流直下。',
    tags: ['原始林海', '天池飞瀑', '长白温泉', '北国秘境'],
    photos: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 60,
      scale: 'Boreal Ambient · D Major',
      instruments: '清澈钢琴 · 原声大提琴 · 松涛林风',
      naturalSound: 'wind',
      prompt: '长白山北国针叶林纯钢琴与大提琴、松涛阵阵、温泉雾气、深远沉静'
    }
  },
  {
    id: 'yakushima',
    name: '屋久岛 · 幽灵公主苔藓森林',
    enName: 'Yakushima Moss Forest',
    location: '日本 · 鹿儿岛县',
    country: '日本',
    category: 'forest',
    lat: 30.3585,
    lng: 130.5286,
    description: '宫崎骏《幽灵公主》的取景地。数千年的古老绳文杉矗立在翠绿的苔藓地毯中，雨露晶莹，空气中弥漫着古老生命的芬芳。',
    tags: ['幽灵公主', '千年绳文杉', '苔藓王国', '森林浴'],
    photos: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 58,
      scale: 'Ghibli Style · C Major',
      instruments: '纯净钢琴独奏 · 雨滴落在绿叶上 · 林间风响',
      naturalSound: 'rain',
      prompt: '吉卜力宫崎骏风治愈钢琴、屋久岛绿意苔藓、细雨落在树叶、静心专注'
    }
  },
  {
    id: 'blackforest',
    name: '德国黑森林 · 咕咕鸟谷',
    enName: 'Black Forest (Schwarzwald)',
    location: '德国 · 巴登-符腾堡州',
    country: '德国',
    category: 'forest',
    lat: 48.1500,
    lng: 8.2000,
    description: '格林童话的发源地。浓密的冷杉与云杉林遮天蔽日，晨雾在林间小径流淌，溪流穿过木屋与水车，洋溢着古老欧陆的静谧。',
    tags: ['格林童话', '冷杉幽径', '咕咕钟故乡', '欧陆森林'],
    photos: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 66,
      scale: 'Celtic Folk · D Major',
      instruments: '爱尔兰风笛 · 凯尔特竖琴 · 森林微风',
      naturalSound: 'birds',
      prompt: '德国黑森林凯尔特竖琴与风笛、阳光穿透树冠、鸟鸣花香、安逸宁静'
    }
  },
  {
    id: 'amazon',
    name: '亚马逊雨林 · 地球之肺',
    enName: 'Amazon Rainforest',
    location: '巴西 · 亚马逊州',
    country: '巴西',
    category: 'forest',
    lat: -3.4653,
    lng: -62.2159,
    description: '地球上最庞大的生命剧场。庞大的水系在茂密雨林中蜿蜒流淌，暴雨洗刷着巨大的王莲，各种热带生物的声音汇成自然的交响。',
    tags: ['地球之肺', '生物大本营', '热带暴雨', '原始秘境'],
    photos: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 60,
      scale: 'Organic Tribal Ambient',
      instruments: '木制打击乐 · 排箫 · 真实热带雨声 · 昆虫共鸣',
      naturalSound: 'rain',
      prompt: '亚马逊热带雨林自然白噪音与排箫、密林暴雨滴落、生命律动、深度白噪音'
    }
  },
  {
    id: 'redwood',
    name: '加州红杉国家公园',
    enName: 'Redwood National and State Parks',
    location: '美国 · 加利福尼亚州',
    country: '美国',
    category: 'forest',
    lat: 41.2132,
    lng: -124.0046,
    description: '地球上最高大的树木在此矗立了数千年。太平洋的晨雾在几百米高的巨树冠间游荡，阳光形成壮丽的丁达尔圣光。',
    tags: ['千年巨杉', '丁达尔光', '太平洋海雾', '远古崇高'],
    photos: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 56,
      scale: 'Ambient Drone · E Major',
      instruments: '原声大提琴长弓 · 温暖铜管音垫 · 雾气清风',
      naturalSound: 'wind',
      prompt: '加州巨杉林崇高氛围音乐、温暖弦乐铺底、丁达尔光芒洒落、神圣宁静'
    }
  },
  {
    id: 'plitvice',
    name: '普利特维采湖群 · 欧洲十六湖',
    enName: 'Plitvice Lakes National Park',
    location: '克罗地亚 · 利卡-塞尼县',
    country: '克罗地亚',
    category: 'forest',
    lat: 44.8654,
    lng: 15.6044,
    description: '石灰华沉积形成的梯级湖泊与飞瀑群。木栈道蜿蜒穿过碧绿与湖蓝交织的水面，水雾弥漫在原始山林之间。',
    tags: ['欧洲九寨沟', '瀑布群', '梯级绿湖', '木栈道漫步'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_guitar',
      bpm: 68,
      scale: 'Balkan Acoustic · A Minor',
      instruments: '手风琴 · 尼龙吉他 · 瀑布飞溅声 · 森林鸟鸣',
      naturalSound: 'birds',
      prompt: '欧洲森林瀑布群舒缓纯乐、吉他与风琴、流水潺潺飞瀑、自然疗愈'
    }
  },

  // ==================== 6. 城市夜景 (City Nightscapes & Skylines) ====================
  {
    id: 'shanghai',
    name: '上海外滩 · 浦江陆家嘴',
    enName: 'The Bund & Lujiazui Skyline',
    location: '中国 · 上海黄浦',
    country: '中国',
    category: 'city',
    lat: 31.2400,
    lng: 121.4900,
    description: '万国建筑博览群与东方明珠、上海中心隔江相望。夜色降临，黄浦江游轮穿梭，流光溢彩的摩天大楼编织着摩登魔都的不眠夜。',
    tags: ['摩登魔都', '陆家嘴天际线', '浦江两岸', '霓虹不夜城'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1538428494232-9d0d8a3ab403?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_lofi',
      bpm: 78,
      scale: 'Lo-Fi Jazz · F Minor',
      instruments: '电钢琴EP · 萨克斯柔音 · 城市雨声 · 磁带黑胶底噪',
      naturalSound: 'rain',
      prompt: '上海魔都夜景Lo-Fi Jazz HipHop、柔滑电钢琴和弦、雨夜霓虹、放松专注'
    }
  },
  {
    id: 'chongqing',
    name: '重庆洪崖洞 · 8D魔幻山城',
    enName: 'Chongqing Hongyadong',
    location: '中国 · 重庆渝中',
    country: '中国',
    category: 'city',
    lat: 29.5630,
    lng: 106.5770,
    description: '依嘉陵江悬崖而建的重檐吊脚楼，千厮门大桥如金色长虹横跨江面。夜晚华灯初上，宛若现实版千与千寻的魔幻世界。',
    tags: ['千与千寻', '8D魔幻山城', '洪崖滴翠', '赛博朋克'],
    photos: [
      'https://images.unsplash.com/photo-1538428494232-9d0d8a3ab403?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_lofi',
      bpm: 82,
      scale: 'Cyberpunk Chill · C Minor',
      instruments: '合成波Synth · 二胡电子音色 · 江边微浪',
      naturalSound: 'rain',
      prompt: '重庆赛博朋克国风电子、二胡与合成器结合、魔幻山城雨夜、千与千寻既视感'
    }
  },
  {
    id: 'hongkong',
    name: '香港维多利亚港 · 太平山顶',
    enName: 'Victoria Harbour & The Peak',
    location: '中国 · 香港中环',
    country: '中国',
    category: 'city',
    lat: 22.2800,
    lng: 114.1588,
    description: '世界三大夜景之首。天星小轮划破倒映着璀璨霓虹的港湾，中环与尖沙咀的摩天巨楼交相辉映，港风往事如电影慢镜头回放。',
    tags: ['维港夜景', '天星小轮', '经典港风', '东方之珠'],
    photos: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1538428494232-9d0d8a3ab403?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_lofi',
      bpm: 76,
      scale: 'City Pop Chill · A Minor',
      instruments: '复古电吉他 · 柔美合成器 · 维港海浪微音',
      naturalSound: 'ocean',
      prompt: '香港维港夜色CityPop纯音乐、复古电吉他扫弦、霓虹倒影、怀旧温暖'
    }
  },
  {
    id: 'tokyo',
    name: '东京涩谷 · 新宿歌舞伎町',
    enName: 'Tokyo Shibuya & Shinjuku Night',
    location: '日本 · 东京',
    country: '日本',
    category: 'city',
    lat: 35.6595,
    lng: 139.7005,
    description: '全世界最繁忙的十字路口，雨夜的地面反射着漫天霓虹与巨幅广告屏幕。透明雨伞下的人流川流不息，独享喧嚣中的内心孤独。',
    tags: ['涩谷十字路口', '雨夜霓虹', '东京塔远眺', '独处治愈'],
    photos: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1538428494232-9d0d8a3ab403?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_lofi',
      bpm: 80,
      scale: 'Tokyo Lo-Fi Beat · D Minor',
      instruments: '电钢琴EP · 慢速鼓点 · 雨点打在雨伞声 · 黑胶唱片爆音',
      naturalSound: 'rain',
      prompt: '东京雨夜Lo-Fi Beats、舒缓电钢琴、雨声伴奏、黑胶质感、深夜办公专注'
    }
  },
  {
    id: 'paris',
    name: '巴黎塞纳河畔 · 埃菲尔铁塔',
    enName: 'Paris Seine & Eiffel Tower',
    location: '法国 · 巴黎',
    country: '法国',
    category: 'city',
    lat: 48.8584,
    lng: 2.2945,
    description: '铁塔在整点闪烁着漫天金色星光。塞纳河下游船缓缓驶过亚历山大三世桥，岸边情侣依偎在街灯下，弥漫着永恒的法式浪漫。',
    tags: ['光之城', '铁塔星光', '塞纳河游船', '极致浪漫'],
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_lofi',
      bpm: 72,
      scale: 'French Cafe Chanson · C Major',
      instruments: '手风琴微音 · 清水钢琴 · 塞纳河水流声',
      naturalSound: 'wind',
      prompt: '巴黎塞纳河手风琴与法式钢琴纯乐、街头咖啡馆雨滴、浪漫惬意、午后甜点'
    }
  },
  {
    id: 'newyork',
    name: '纽约曼哈顿 · 洛克菲勒顶峰夜色',
    enName: 'New York Manhattan Skyline',
    location: '美国 · 纽约曼哈顿',
    country: '美国',
    category: 'city',
    lat: 40.7587,
    lng: -73.9787,
    description: '帝国大厦与世贸中心高耸入云，无数网格状街道在脚下化作金色光带。世界十字路口的繁华尽收眼底，感受现代文明的澎湃脉搏。',
    tags: ['曼哈顿天际线', '帝国大厦', '不夜之城', '时代广场'],
    photos: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1538428494232-9d0d8a3ab403?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_lofi',
      bpm: 85,
      scale: 'Smooth Jazz · B Flat',
      instruments: '低音提琴行走低音 · 柔音小号 · 远处车流微音',
      naturalSound: 'rain',
      prompt: '纽约曼哈顿午夜爵士、柔和小号独奏、行走低音提琴、都市雨夜、深度思考'
    }
  },

  // ==================== 7. 湖泊湿地 (Lakes & Wetlands) ====================
  {
    id: 'westlake',
    name: '杭州西湖 · 断桥残雪与苏堤春晓',
    enName: 'Hangzhou West Lake',
    location: '中国 · 浙江杭州',
    country: '中国',
    category: 'lake',
    lat: 30.2435,
    lng: 120.1450,
    description: '水光潋滟晴方好，山色空蒙雨亦奇。苏堤杨柳依依，三潭印月水波微泛，撑一把油纸伞漫步湖畔，千年诗意尽在此间。',
    tags: ['断桥残雪', '苏堤春晓', '三潭印月', '人间天堂'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 66,
      scale: '西湖越调五声 · 432Hz',
      instruments: '古筝 · 洞箫 · 湖水拍堤 · 净慈寺晚钟',
      naturalSound: 'bell',
      prompt: '杭州西湖古典纯乐、古筝与洞箫、南屏晚钟、细雨落在湖面荷叶、极度治愈'
    }
  },
  {
    id: 'qinghai',
    name: '青海湖 · 高原蓝宝石与油菜花海',
    enName: 'Qinghai Lake & Rapeseed Flowers',
    location: '中国 · 青海海北',
    country: '中国',
    category: 'lake',
    lat: 36.8856,
    lng: 100.2244,
    description: '中国最大的内陆咸水湖。金黄的万亩油菜花田铺展在湛蓝如宝石的高原湖畔，远处雪山静卧，天水一色辽阔无垠。',
    tags: ['高原蓝宝石', '油菜花海', '环湖公路', '天空之境'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 62,
      scale: 'Tibetan Plateau Folk · D Major',
      instruments: '扎木念琴 · 空灵女声氛围音 · 高原清风',
      naturalSound: 'wind',
      prompt: '青海湖藏族空灵民谣氛围曲、纯净辽阔、湛蓝湖水微波、抚平心境'
    }
  },
  {
    id: 'lugu',
    name: '泸沽湖 · 摩梭女儿国',
    enName: 'Lugu Lake & Mosuo Culture',
    location: '中国 · 云南/四川交界',
    country: '中国',
    category: 'lake',
    lat: 27.7083,
    lng: 100.7500,
    description: '格姆女神山庇护下的清澈湖泊，湖面上盛开着星星点点的水性杨花。猪槽船在水草间穿行，摩梭人悠扬的歌声在碧波上荡漾。',
    tags: ['水性杨花', '猪槽船', '东方女儿国', '宁静避世'],
    photos: [
      'https://images.unsplash.com/photo-1527684651001-731c474bbb5a?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 68,
      scale: '摩梭山歌调 · E Major',
      instruments: '木吉他 · 竹笛 · 划桨水声 · 晨雾微响',
      naturalSound: 'ocean',
      prompt: '泸沽湖晨曦纯音乐、划桨水声、竹笛悠扬、微风拂过水性杨花、恬静优雅'
    }
  },
  {
    id: 'chaka',
    name: '茶卡盐湖 · 中国天空之镜',
    enName: 'Chaka Salt Lake',
    location: '中国 · 青海乌兰',
    country: '中国',
    category: 'lake',
    lat: 36.7028,
    lng: 99.0767,
    description: '白茫茫的结晶盐层上覆盖着薄薄水层，如一面巨镜倒映出瓦蓝的天空与朵朵白云。漫步其中，宛如行走在天际云端。',
    tags: ['天空之镜', '盐湖小火车', '云端漫步', '纯白梦境'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 58,
      scale: 'Crystal Ambient · 528Hz',
      instruments: '水晶音乐盒 · 极简钢琴音符 · 天空风声',
      naturalSound: 'wind',
      prompt: '天空之镜晶莹纯音、水晶音符与极简钢琴、纯净白云、灵魂洗涤、静心'
    }
  },
  {
    id: 'guilin',
    name: '桂林阳朔 · 漓江烟雨遇龙河',
    enName: 'Guilin Yangshuo & Li River',
    location: '中国 · 广西桂林',
    country: '中国',
    category: 'lake',
    lat: 24.7797,
    lng: 110.4950,
    description: '桂林山水甲天下，阳朔堪称甲桂林。喀斯特群峰倒映在清澈见底的漓江中，竹筏顺流漂过二十元人民币取景地，烟雨朦胧宛如仙境。',
    tags: ['漓江竹筏', '喀斯特峰林', '烟雨山水', '甲天下美景'],
    photos: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 66,
      scale: '漓江清音 · 五声角调',
      instruments: '竹笛 · 渔舟唱晚古筝 · 撑篙水声 · 鸬鹚捕鱼',
      naturalSound: 'rain',
      prompt: '桂林山水漓江烟雨笛箫纯乐、古筝流水、竹筏荡漾、诗情画意'
    }
  },
  {
    id: 'baikal',
    name: '贝加尔湖 · 蓝冰与西伯利亚的眼泪',
    enName: 'Lake Baikal & Blue Ice',
    location: '俄罗斯 · 西伯利亚',
    country: '俄罗斯',
    category: 'lake',
    lat: 53.5587,
    lng: 108.1650,
    description: '世界上最深、最清澈的古老湖泊。冬季湖面冻结成深邃透亮的蓝冰，纵横交错的冰裂纹如艺术品般延伸至地平线，宛如纯净的水晶宫。',
    tags: ['西伯利亚蓝冰', '冰裂奇观', '世界最深湖', '李健歌声里的湖'],
    photos: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 54,
      scale: 'Siberian Melancholy · A Minor',
      instruments: '原声大提琴独奏 · 冰裂共鸣 · 远方呼啸寒风',
      naturalSound: 'wind',
      prompt: '贝加尔湖大提琴独奏纯乐、深沉优美、李健贝加尔湖畔意境、冰雪与深蓝'
    }
  },
  {
    id: 'geneva',
    name: '日内瓦湖 · 莱蒙湖大喷泉',
    enName: 'Lake Geneva (Lac Léman)',
    location: '瑞士/法国 · 日内瓦',
    country: '瑞士',
    category: 'lake',
    lat: 46.4530,
    lng: 6.5500,
    description: '阿尔卑斯雪山环抱中的月牙形大湖。大喷泉直冲云霄，西庸古堡伫立于湖畔岩石上，白天鹅悠游其间，优雅宁静。',
    tags: ['西庸古堡', '大喷泉', '雪山倒影', '瑞士田园'],
    photos: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 70,
      scale: 'Classical Romantic · B Flat',
      instruments: '双簧管 · 钢琴伴奏 · 湖面微浪拍击',
      naturalSound: 'ocean',
      prompt: '日内瓦湖浪漫古典器乐、钢琴与双簧管、波光粼粼、优雅天鹅、放松心情'
    }
  },
  {
    id: 'como',
    name: '意大利科莫湖 · 贝拉焦半岛',
    enName: 'Lake Como & Bellagio',
    location: '意大利 · 伦巴第大区',
    country: '意大利',
    category: 'lake',
    lat: 45.9867,
    lng: 9.2625,
    description: '阿尔卑斯南麓的度假胜地，两岸依山分布着百年贵族庄园与花团锦簇的别墅。阳光洒落湖面，泛舟湖上享受意式甜蜜生活。',
    tags: ['意式庄园', '贝拉焦半岛', '阿尔卑斯湖泊', '优雅惬意'],
    photos: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 72,
      scale: 'Italian Serenade · G Major',
      instruments: '曼陀林 · 古典吉他 · 湖水荡漾',
      naturalSound: 'ocean',
      prompt: '科莫湖意式浪漫小夜曲、曼陀林与古典吉他、夏日湖畔、轻松惬意'
    }
  },
  {
    id: 'banff',
    name: '班夫国家公园 · 梦莲湖',
    enName: 'Banff National Park & Moraine Lake',
    location: '加拿大 · 艾伯塔省',
    country: '加拿大',
    category: 'lake',
    lat: 51.3217,
    lng: -116.1860,
    description: '落基山脉十峰山谷下的冰川融湖。湖水呈现奇迹般璀璨的宝石蓝，独木舟轻轻划破如镜水面，两岸针叶林倒映其间。',
    tags: ['落基山明珠', '十峰谷', '冰川宝石蓝', '独木舟泛舟'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 60,
      scale: 'Nordic Acoustic · C Major',
      instruments: '清脆木吉他 · 柔美弦乐 · 划水声 · 针叶林清风',
      naturalSound: 'wind',
      prompt: '加拿大落基山原声吉他与弦乐、宝石蓝湖水微澜、独木舟慢游、空灵清新'
    }
  },

  // ==================== 8. 🇨🇳 中国 5A 级核心名胜与世界文化自然遗产 ====================
  {
    id: 'gugong',
    name: '北京故宫博物院',
    enName: 'The Palace Museum (Forbidden City)',
    location: '中国 · 北京市东城区',
    country: '中国',
    category: 'town',
    lat: 39.9163,
    lng: 116.3972,
    description: '明清两代皇家宫殿，红墙金瓦，气势恢宏。角楼倒映在护城河的微澜中，雪落紫禁城时，尽显华夏千年古都沉静庄严的东方意蕴。',
    tags: ['国家5A级', '世界文化遗产', '紫禁城', '太和殿', '角楼夜色'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 62,
      scale: '宫调 · 432Hz 皇家正声',
      instruments: '编钟 · 古琴 · 箫 · 庭院风铃',
      naturalSound: 'bell',
      prompt: '中国皇家宫廷古典器乐，编钟与古琴，庄严肃穆，空灵悠扬，无歌词'
    }
  },
  {
    id: 'greatwall',
    name: '八达岭万里长城',
    enName: 'Great Wall of China (Badaling)',
    location: '中国 · 北京市延庆区',
    country: '中国',
    category: 'mountain',
    lat: 40.3582,
    lng: 116.0152,
    description: '宛若巨龙蜿蜒横亘于崇山峻岭之上。烽火台巍峨耸立，极目远眺，群山叠嶂，千载烽烟尽付秋风苍茫之中。',
    tags: ['国家5A级', '世界七大奇迹', '不到长城非好汉', '烽火台'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 66,
      scale: '角调 · 雄浑苍茫',
      instruments: '埙 · 琵琶大曲 · 高山罡风',
      naturalSound: 'wind',
      prompt: '中国风雄浑埙与琵琶，崇山峻岭清风，历史苍茫，壮怀激烈，纯器乐'
    }
  },
  {
    id: 'summerpalace',
    name: '北京颐和园',
    enName: 'Summer Palace Beijing',
    location: '中国 · 北京市海淀区',
    country: '中国',
    category: 'lake',
    lat: 39.9998,
    lng: 116.2755,
    description: '万寿山下，昆明湖畔。十七孔桥金光穿洞，画舫泛波于碧水之间，长廊彩绘蜿蜒千米，乃中国皇家园林艺术的绝美典范。',
    tags: ['国家5A级', '世界文化遗产', '十七孔桥', '昆明湖', '皇家园林'],
    photos: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 68,
      scale: '羽调 · 昆明烟波',
      instruments: '竹笛 · 阮咸 · 柔波荡漾',
      naturalSound: 'rain',
      prompt: '古典皇家园林曲调，竹笛与中阮，湖水涟漪，画舫轻摇，静美清幽'
    }
  },
  {
    id: 'forbiddencity',
    name: '北京故宫紫禁城',
    enName: 'Forbidden City Beijing',
    location: '中国 · 北京市东城区',
    country: '中国',
    category: 'historic',
    lat: 39.9163,
    lng: 116.3971,
    description: '红墙金瓦，六百年巍峨帝阙。太和殿前云气缭绕，角楼倒映护城河夕照，回荡着华夏文明的宏大历史回响。',
    tags: ['世界文化遗产', '国家5A级', '紫禁城', '太和殿', '角楼夕照'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'imperial_epic',
      bpm: 72,
      scale: '宫调 · 紫禁龙骧',
      instruments: '编钟 · 古琴 · 琵琶 · 大堂鼓',
      naturalSound: 'wind',
      prompt: '中国宫廷宏伟古风纯音乐，编钟古琴，庄严肃穆，厚重历史感'
    }
  },
  {
    id: 'templeofheaven',
    name: '北京天坛祈年殿',
    enName: 'Temple of Heaven Beijing',
    location: '中国 · 北京市东城区',
    country: '中国',
    category: 'historic',
    lat: 39.8837,
    lng: 116.4128,
    description: '三重蓝琉璃瓦顶直插苍穹，汉白玉基座层层环绕。古柏森森，回音壁前轻语犹在，天人合一之至高哲学体现。',
    tags: ['世界文化遗产', '国家5A级', '祈年殿', '天人合一', '古柏森森'],
    photos: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'sacred_zen',
      bpm: 60,
      scale: '角调 · 祈天之音',
      instruments: '古瑟 · 洞箫 · 铜磬 · 晨钟',
      naturalSound: 'bell',
      prompt: '天坛祭天古韵，铜磬悠远，洞箫清越，天地苍茫，空灵神圣'
    }
  },
  {
    id: 'badalinggreatwall',
    name: '北京八达岭长城',
    enName: 'Badaling Great Wall Beijing',
    location: '中国 · 北京市延庆区',
    country: '中国',
    category: 'mountain',
    lat: 40.3598,
    lng: 116.0152,
    description: '不到长城非好汉。巨龙蜿蜒盘旋于崇山峻岭之巅，烽火台俯瞰燕山雄关，秋风吹拂千年金戈铁马。',
    tags: ['世界七大奇迹', '世界文化遗产', '八达岭', '燕山雄关'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_epic',
      bpm: 80,
      scale: '商调 · 烽燧雄关',
      instruments: '埙 · 战鼓 · 琵琶大潮',
      naturalSound: 'wind',
      prompt: '雄浑长城古风乐，埙与琵琶，万山叠嶂，历史长风呼啸'
    }
  },
  {
    id: 'shichahai',
    name: '北京什刹海后海',
    enName: 'Shichahai Lake Beijing',
    location: '中国 · 北京市西城区',
    country: '中国',
    category: 'lake',
    lat: 39.9405,
    lng: 116.3889,
    description: '银锭观山，柳岸斜阳。摇橹船轻荡后海微波，四合院胡同深处传来鸽哨与京胡声，最地道的老北京水乡风情。',
    tags: ['国家4A级', '银锭桥', '胡同京韵', '摇橹船', '什刹海'],
    photos: [
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_folk',
      bpm: 76,
      scale: '微调 · 银锭晚风',
      instruments: '三弦 · 琵琶 · 鸽哨 · 柳浪水声',
      naturalSound: 'water',
      prompt: '老北京后海民谣风情，三弦轻弹，清脆鸽哨，夏夜晚风，舒适治愈'
    }
  },
  {
    id: 'yonghegong',
    name: '北京雍和宫',
    enName: 'Yonghe Palace Beijing',
    location: '中国 · 北京市东城区',
    country: '中国',
    category: 'historic',
    lat: 39.9472,
    lng: 116.4178,
    description: '藏传佛教皇家寺院，藏香缭绕，法铃清脆。高耸万福阁内伫立迈达拉巨佛，红墙黄瓦间沉淀着万千虔诚与宁静。',
    tags: ['国家5A级', '皇家寺院', '万福阁', '藏香古刹', '祈福胜地'],
    photos: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'temple_peace',
      bpm: 56,
      scale: '禅调 · 梵音清净',
      instruments: '颂钵 · 铜铃 · 诵经长音',
      naturalSound: 'bell',
      prompt: '藏地与京城寺院梵音，颂钵空灵，铜铃轻响，抚慰心灵，极度治愈'
    }
  },
  {
    id: 'nanluoguxiang',
    name: '北京南锣鼓巷与钟鼓楼',
    enName: 'Nanluoguxiang & Drum Tower Beijing',
    location: '中国 · 北京市东城区',
    country: '中国',
    category: 'city',
    lat: 39.9388,
    lng: 116.4022,
    description: '暮鼓晨钟，七百载古巷幽深。灰砖灰瓦四合院，槐树荫下自行车铃叮咚，现代艺术与老北京胡同肌理完美交融。',
    tags: ['历史文化街区', '钟鼓楼', '四合院', '胡同慢生活'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'hutong_lofi',
      bpm: 82,
      scale: '羽调 · 胡同慢调',
      instruments: '木吉他 · 手风琴 · 叮咚车铃',
      naturalSound: 'city',
      prompt: '北京胡同慢调Lofi纯音乐，木吉他清脆，手风琴悠扬，闲适惬意'
    }
  },
  {
    id: 'beihaipark',
    name: '北京北海公园白塔',
    enName: 'Beihai Park White Pagoda Beijing',
    location: '中国 · 北京市西城区',
    country: '中国',
    category: 'lake',
    lat: 39.9255,
    lng: 116.3880,
    description: '“让我们荡起双桨，小船儿推开波浪。” 琼华岛上藏式白塔巍然耸立，碧波荡漾，荷花映日，一代代人的童年浪漫记忆。',
    tags: ['国家4A级', '皇家御苑', '琼华岛', '白塔映湖', '荡起双桨'],
    photos: [
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'nostalgia_lake',
      bpm: 70,
      scale: '宫调 · 荡漾双桨',
      instruments: '童声旋律八音盒 · 竹笛 · 木吉他 · 湖水波浪',
      naturalSound: 'water',
      prompt: '轻柔童年回忆八音盒与竹笛，湖水波光粼粼，轻柔温暖，治愈怀旧'
    }
  },
  {
    id: 'jingshanpark',
    name: '北京景山公园万春亭',
    enName: 'Jingshan Park Beijing',
    location: '中国 · 北京市西城区',
    country: '中国',
    category: 'mountain',
    lat: 39.9242,
    lng: 116.3965,
    description: '北京内城中轴最高峰。登临万春亭，南望紫禁城金顶如海，北观钟鼓楼中轴连绵，落日余晖洒满整座千年古都。',
    tags: ['中轴线核心', '万春亭', '俯瞰故宫', '京城全景', '落日余晖'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'sunset_zen',
      bpm: 64,
      scale: '徽调 · 登高揽胜',
      instruments: '古筝 · 大提琴 · 晚风呼啸',
      naturalSound: 'wind',
      prompt: '高处俯瞰壮丽落日，古筝与深情大提琴，辽阔庄严，黄昏史诗'
    }
  },
  {
    id: 'potala',
    name: '拉萨布达拉宫',
    enName: 'Potala Palace Lhasa',
    location: '中国 · 西藏拉萨市',
    country: '中国',
    category: 'mountain',
    lat: 29.6554,
    lng: 91.1172,
    description: '红白相间的圣殿高耸于红山之上，金顶在雪域日光下璀璨夺目。八廓街转经筒轻摇，桑烟袅袅，经幡在高原清风中诵念千古祈愿。',
    tags: ['国家5A级', '世界文化遗产', '日光城', '雪域圣殿', '朝圣之旅'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 52,
      scale: '藏地禅音 · 432Hz',
      instruments: '藏密铜磬 · 鹰骨笛 · 低回诵唱微鸣',
      naturalSound: 'bell',
      prompt: '西藏雪域高原空灵禅乐，铜磐与骨笛，纯净心灵，高山流云'
    }
  },
  {
    id: 'taishan',
    name: '泰山风景名胜区',
    enName: 'Mount Tai Shandong',
    location: '中国 · 山东省泰安市',
    country: '中国',
    category: 'mountain',
    lat: 36.2559,
    lng: 117.1069,
    description: '五岳之首，天下第一山。登十八盘直上南天门，极顶日出云海翻涌，万丈红霞染透岱宗，会当凌绝顶，一览众山小。',
    tags: ['国家5A级', '世界文化与自然双遗产', '五岳之尊', '泰山日出', '南天门'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 64,
      scale: '商调 · 岱宗雄浑',
      instruments: '编钟 · 鼓 · 箫 · 高山阵风',
      naturalSound: 'wind',
      prompt: '泰山日出云海古典器乐，雄壮大气，箫声与编钟，松涛回荡'
    }
  },
  {
    id: 'huangshan',
    name: '黄山风景名胜区',
    enName: 'Mount Huangshan Anhui',
    location: '中国 · 安徽省黄山市',
    country: '中国',
    category: 'mountain',
    lat: 30.1318,
    lng: 118.1746,
    description: '五岳归来不看山，黄山归来不看岳。奇松挺拔于绝壁，怪石嶙峋，云海蒸腾如梦似幻，温泉潺潺，犹如天开水墨画卷。',
    tags: ['国家5A级', '世界文化与自然双遗产', '迎客松', '黄山云海', '光明顶'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 58,
      scale: '徽调水墨 · 羽声',
      instruments: '古筝 · 洞箫 · 云雾微风 · 奇松松涛',
      naturalSound: 'wind',
      prompt: '水墨黄山仙境器乐，空灵洞箫与古筝，奇松怪石，云海飘渺'
    }
  },
  {
    id: 'huashan',
    name: '华山风景名胜区',
    enName: 'Mount Huashan Shaanxi',
    location: '中国 · 陕西省渭南市',
    country: '中国',
    category: 'mountain',
    lat: 34.4883,
    lng: 110.0867,
    description: '奇险天下第一山。长空栈道悬于千仞绝壁，苍龙岭如游龙卧脊，东峰观日出，西峰试剑石，尽显西岳挺拔冷峻之骨气。',
    tags: ['国家5A级', '西岳华山', '长空栈道', '苍龙岭', '绝壁奇险'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 70,
      scale: '秦腔遗韵 · 角调',
      instruments: '古琴 · 琵琶扫弦 · 峭壁罡风',
      naturalSound: 'wind',
      prompt: '华山绝壁古琴与琵琶，苍茫辽远，奇险挺拔，侠骨柔情'
    }
  },
  {
    id: 'emeishan',
    name: '峨眉山-乐山大佛',
    enName: 'Mount Emei & Leshan Giant Buddha',
    location: '中国 · 四川省乐山市',
    country: '中国',
    category: 'mountain',
    lat: 29.5998,
    lng: 103.3364,
    description: '峨眉天下秀，金顶祥光普照。大佛依凌云山栖霞峰临江而凿，大江东去，佛是一座山，山是一尊佛，佛音缭绕千年不绝。',
    tags: ['国家5A级', '世界文化与自然双遗产', '金顶佛光', '乐山大佛', '峨眉雪霁'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 54,
      scale: '巴蜀梵音 · 432Hz',
      instruments: '铜钟 · 古琴 · 山泉滴水 · 梵呗微鸣',
      naturalSound: 'bell',
      prompt: '峨眉山金顶佛光禅乐，清幽晨钟与古琴，山涧清泉，静心宁神'
    }
  },
  {
    id: 'terracotta',
    name: '秦始皇兵马俑博物馆',
    enName: 'Emperor Qinshihuang Mausoleum Site',
    location: '中国 · 陕西省西安市',
    country: '中国',
    category: 'town',
    lat: 34.3841,
    lng: 109.2785,
    description: '世界第八大奇迹。地下千军万马列阵以待，栩栩如生的陶俑陶马重现大秦帝国扫平六合的磅礴气象，见证中华文明不朽历史。',
    tags: ['国家5A级', '世界文化遗产', '世界第八大奇迹', '大秦帝国', '地下军阵'],
    photos: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 68,
      scale: '秦风古韵 · 宫音',
      instruments: '战鼓 · 埙 · 古筝 · 历史回响',
      naturalSound: 'bell',
      prompt: '大秦军阵历史回响，沉稳战鼓与埙声，苍劲厚重，华夏雄风'
    }
  },
  {
    id: 'guilin_5a',
    name: '桂林漓江风景名胜区',
    enName: 'Li River Guilin',
    location: '中国 · 广西桂林阳朔',
    country: '中国',
    category: 'lake',
    lat: 24.7797,
    lng: 110.4952,
    description: '桂林山水甲天下，阳朔山水甲桂林。江作青罗带，山如碧玉簪。乘一叶竹筏顺流而下，二十元人民币背景风光倒映清澈碧波。',
    tags: ['国家5A级', '世界自然遗产', '漓江竹筏', '象鼻山', '阳朔西街'],
    photos: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 64,
      scale: '壮乡山歌 · 五声调式',
      instruments: '竹笛 · 芦笙 · 漓江水声 · 鸬鹚点水',
      naturalSound: 'ocean',
      prompt: '桂林漓江水墨竹笛，芦笙悠扬，竹筏荡漾，青峰倒影，如诗如画'
    }
  },
  {
    id: 'westlake_5a',
    name: '杭州西湖文化景观',
    enName: 'West Lake Cultural Landscape Hangzhou',
    location: '中国 · 浙江省杭州市',
    country: '中国',
    category: 'lake',
    lat: 30.2435,
    lng: 120.1472,
    description: '水光潋滟晴方好，山色空蒙雨亦奇。苏堤春晓，断桥残雪，雷峰夕照，三潭印月，千古江南诗意尽萃于一湖澄澈烟波。',
    tags: ['国家5A级', '世界文化遗产', '断桥残雪', '苏堤春晓', '雷峰夕照'],
    photos: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 65,
      scale: '西湖琴韵 · 羽调',
      instruments: '古筝 · 洞箫 · 柳浪闻莺 · 细雨润湖',
      naturalSound: 'rain',
      prompt: '江南西湖烟雨古筝曲，轻柔洞箫，荷花微雨，断桥幽梦'
    }
  },
  {
    id: 'huangguoshu',
    name: '贵州黄果树大瀑布',
    enName: 'Huangguoshu Waterfall Guizhou',
    location: '中国 · 贵州省安顺市',
    country: '中国',
    category: 'lake',
    lat: 25.9926,
    lng: 105.6669,
    description: '亚洲最大瀑布，奔腾白水如银河倒挂，轰鸣之声如万马奔腾。水帘洞横贯其间，飞瀑激起漫天彩虹，壮美绝伦。',
    tags: ['国家5A级', '亚洲第一瀑布', '水帘洞', '天星桥', '喀斯特奇观'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 74,
      scale: '黔山水音 · 奔流调',
      instruments: '铜鼓 · 侗族大歌和声 · 飞瀑水雾声',
      naturalSound: 'ocean',
      prompt: '黄果树飞瀑奔腾乐章，铜鼓与少数民族和声，瀑布水汽，气势恢宏'
    }
  },
  {
    id: 'xiaoqikong',
    name: '荔波小七孔风景区',
    enName: 'Libo Xiaoqikong Scenic Area Guizhou',
    location: '中国 · 贵州省黔南州',
    country: '中国',
    category: 'forest',
    lat: 25.2608,
    lng: 107.7289,
    description: '地球绿宝石。七孔古桥横跨碧绿如玉的响水河，拉雅瀑布飞流直下，水上森林树瀑交融，满目苍翠沁人心脾。',
    tags: ['国家5A级', '世界自然遗产', '地球绿宝石', '七孔古桥', '水上森林'],
    photos: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 60,
      scale: '绿野仙踪 · 五声音阶',
      instruments: '竹笛 · 竖琴 · 溪流潺潺 · 鸟鸣幽谷',
      naturalSound: 'birds',
      prompt: '荔波绿宝石森林仙乐，清脆竹笛与竖琴，溪水潺潺，鸟语花香'
    }
  },
  {
    id: 'wuyishan',
    name: '武夷山风景名胜区',
    enName: 'Mount Wuyi Fujian',
    location: '中国 · 福建省南平市',
    country: '中国',
    category: 'mountain',
    lat: 27.6521,
    lng: 117.9733,
    description: '九曲溪竹筏漂流，两岸三十六峰奇绝秀拔。玉女峰与大王峰深情相望，大红袍茶树生长于绝壁岩缝，茶香伴随溪声清冽悠远。',
    tags: ['国家5A级', '世界文化与自然双遗产', '九曲溪竹筏', '大红袍茶树', '玉女峰'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 62,
      scale: '禅茶一味 · 商调',
      instruments: '古琴 · 箫 · 九曲溪流水 · 茶汤斟注',
      naturalSound: 'rain',
      prompt: '武夷山茶禅古琴曲，箫声悠远，溪流竹筏，清茗幽香'
    }
  },
  {
    id: 'lushan',
    name: '庐山风景名胜区',
    enName: 'Mount Lushan Jiangxi',
    location: '中国 · 江西省九江市',
    country: '中国',
    category: 'mountain',
    lat: 29.5638,
    lng: 115.9892,
    description: '横看成岭侧成峰，远近高低各不同。三叠泉飞瀑直泻千尺，含鄱口极目鄱阳湖烟波，牯岭避暑小镇云雾缭绕如仙境。',
    tags: ['国家5A级', '世界文化景观遗产', '三叠泉飞瀑', '含鄱口', '牯岭云雾'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 60,
      scale: '匡庐云涛 · 羽调',
      instruments: '古琴 · 琵琶 · 飞瀑松涛 · 山鸟啼鸣',
      naturalSound: 'wind',
      prompt: '庐山水墨仙境乐章，古琴松涛，飞瀑云海，隐逸诗意'
    }
  },
  {
    id: 'kanas',
    name: '新疆阿勒泰喀纳斯湖',
    enName: 'Kanas Lake Altai Xinjiang',
    location: '中国 · 新疆阿勒泰布尔津',
    country: '中国',
    category: 'lake',
    lat: 48.6931,
    lng: 87.0378,
    description: '阿尔泰山深处的神秘仙境。湖水随四季光线变换翡翠、天青与乳白，卧龙湾、月亮湾、神仙湾云雾升腾，白桦林金黄绚烂如油画。',
    tags: ['国家5A级', '人间净土', '月亮湾', '图瓦人村落', '喀纳斯三湾'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 58,
      scale: '图瓦草调 · 432Hz',
      instruments: '苏尔笛 · 托布秀尔 · 湖水清风 · 白桦落叶',
      naturalSound: 'wind',
      prompt: '新疆喀纳斯神秘湖泊乐曲，苏尔笛与冬不拉，白桦林秋风，静谧纯美'
    }
  },
  {
    id: 'tianshan',
    name: '新疆天山天池',
    enName: 'Heavenly Lake of Tianshan Xinjiang',
    location: '中国 · 新疆昌吉州阜康市',
    country: '中国',
    category: 'lake',
    lat: 43.8856,
    lng: 88.1342,
    description: '博格达雪峰下的瑶池仙境。高山湖泊宛如碧玉镶嵌于雪山云杉林间，传闻西王母设蟠桃宴之处，倒映着巍峨雪峰终年冰霜。',
    tags: ['国家5A级', '世界自然遗产', '博格达峰', '瑶池圣水', '雪山倒影'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 62,
      scale: '西域瑶池 · 宫调',
      instruments: '热瓦普 · 艾捷克 · 雪山清风 · 冰泉滴水',
      naturalSound: 'wind',
      prompt: '天山天池雪域仙境乐曲，热瓦普与冬不拉，博格达雪峰倒影，纯净脱俗'
    }
  },

  // ==================== 9. 🌍 全球顶级世界遗产与世界奇迹名胜 ====================
  {
    id: 'pyramids',
    name: '埃及吉萨金字塔群与狮身人面像',
    enName: 'Giza Pyramids & Sphinx',
    location: '埃及 · 开罗吉萨省',
    country: '埃及',
    category: 'desert',
    lat: 29.9792,
    lng: 31.1342,
    description: '古代世界七大奇迹唯一幸存者。胡夫大金字塔巍然耸立于金色撒哈拉沙漠尽头，狮身人面像凝视东方落日，承载四千年古埃及神秘传奇。',
    tags: ['世界古代七大奇迹', '世界文化遗产', '胡夫金字塔', '狮身人面像', '法老王朝'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_wind',
      bpm: 64,
      scale: 'Ancient Egyptian Scale · D Minor',
      instruments: '乌德琴 · 纳伊笛 · 达布卡手鼓 · 沙漠热风',
      naturalSound: 'wind',
      prompt: '埃及古金字塔神秘史诗乐，乌德琴与手鼓，沙漠落日，千古法老传奇'
    }
  },
  {
    id: 'tajmahal',
    name: '印度阿格拉泰姬陵',
    enName: 'Taj Mahal Agra',
    location: '印度 · 北方邦阿格拉',
    country: '印度',
    category: 'town',
    lat: 27.1751,
    lng: 78.0421,
    description: '白色大理石砌筑的永恒爱情丰碑。亚穆纳河畔的水面倒映着完美对称的穹顶与尖塔，朝霞与暮色中呈现梦幻般的粉白与金黄。',
    tags: ['世界新七大奇迹', '世界文化遗产', '大理石穹顶', '亚穆纳河畔', '莫卧儿建筑'],
    photos: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 58,
      scale: 'Raga Yaman · Indian Classical',
      instruments: '西塔琴 · 塔布拉鼓 · 班苏里竹笛',
      naturalSound: 'rain',
      prompt: '泰姬陵印度古典冥想西塔琴曲，塔布拉鼓与竹笛，晨光微曦，深情浪漫'
    }
  },
  {
    id: 'angkorwat',
    name: '柬埔寨暹粒吴哥窟',
    enName: 'Angkor Wat Siem Reap',
    location: '柬埔寨 · 暹粒省',
    country: '柬埔寨',
    category: 'forest',
    lat: 13.4125,
    lng: 103.8670,
    description: '高棉微笑与丛林古迹的终极奇观。巨大的热带榕树盘根错节包裹着千年石雕神庙，荷花池畔日出将五座莲花佛塔染成耀眼金光。',
    tags: ['世界文化遗产', '吴哥古迹', '高棉微笑', '塔普伦寺', '莲花塔日出'],
    photos: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 56,
      scale: 'Khmer Mystic · Pentatonic',
      instruments: '高棉木琴 · 钟磬 · 雨林鸟鸣 · 晨雾微风',
      naturalSound: 'birds',
      prompt: '吴哥窟热带雨林古迹禅乐，木琴与钟声，千年高棉微笑，神秘空灵'
    }
  },
  {
    id: 'machupicchu',
    name: '秘鲁马丘比丘印加遗址',
    enName: 'Machu Picchu Inca Citadel',
    location: '秘鲁 · 库斯科大区',
    country: '秘鲁',
    category: 'mountain',
    lat: -13.1631,
    lng: -72.5450,
    description: '安第斯山脉云端之上的失落之城。梯田与巨石城堡屹立于巍峨峰巅之间，晨雾飘渺穿行于印加太阳神庙，羊驼在草坡上闲庭信步。',
    tags: ['世界新七大奇迹', '世界文化与自然双遗产', '印加帝国', '失落之城', '安第斯云海'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_wind',
      bpm: 64,
      scale: 'Andean Flute · El Condor Pasa Mode',
      instruments: '印加排箫 · 恰朗戈小吉他 · 安第斯山风',
      naturalSound: 'wind',
      prompt: '安第斯山印加排箫经典乐曲，轻柔吉他与山风，雄鹰展翅，云端古堡'
    }
  },
  {
    id: 'colosseum',
    name: '意大利罗马斗兽场',
    enName: 'Colosseum & Roman Forum',
    location: '意大利 · 罗马市中心',
    country: '意大利',
    category: 'town',
    lat: 41.8902,
    lng: 12.4922,
    description: '古罗马帝国永恒标志。圆形拱门与三层石柱见证了两千年前角斗士的荣耀传奇，夜幕降临时金色灯光将古老剧场映照得如梦如幻。',
    tags: ['世界新七大奇迹', '世界文化遗产', '古罗马帝国', '永恒之城', '拱券建筑'],
    photos: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 68,
      scale: 'Classical Roman Hymn · A Minor',
      instruments: '大提琴 · 古典弦乐组 · 铜管号角回音',
      naturalSound: 'bell',
      prompt: '古罗马斗兽场史诗古典大提琴与交响弦乐，苍茫历史，庄重深沉'
    }
  },
  {
    id: 'cappadocia',
    name: '土耳其卡帕多奇亚热气球山谷',
    enName: 'Cappadocia Hot Air Balloon Valley',
    location: '土耳其 · 内夫谢希尔省',
    country: '土耳其',
    category: 'desert',
    lat: 38.6431,
    lng: 34.8289,
    description: '月球表面般的奇幻地貌。数以百计五彩缤纷的热气球在日出时分缓缓升空，漂浮在精灵烟囱与洞穴城堡之上，谱写最浪漫的空中童话。',
    tags: ['世界文化与自然双遗产', '热气球日出', '精灵烟囱', '洞穴城堡', '月球地貌'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_wind',
      bpm: 66,
      scale: 'Anatolian Sunset · G Minor',
      instruments: '萨兹琴 · 奈伊笛 · 日出微风 · 喷火气流微声',
      naturalSound: 'wind',
      prompt: '土耳其卡帕多奇亚热气球浪漫清晨音乐，萨兹琴与空灵木笛，唯美治愈'
    }
  },
  {
    id: 'geirangerfjord',
    name: '挪威盖朗厄尔峡湾',
    enName: 'Geirangerfjord Norway',
    location: '挪威 · 默勒-鲁姆斯达尔郡',
    country: '挪威',
    category: 'lake',
    lat: 62.1015,
    lng: 7.0941,
    description: '世界最壮美的大峡湾。万年冰川切割出的千米翡翠峡谷，七姐妹瀑布从高耸悬崖奔涌而下，游轮穿行其间如入北欧童话之境。',
    tags: ['世界自然遗产', '七姐妹瀑布', '北欧峡湾', '万年冰川', '翡翠水系'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 56,
      scale: 'Nordic Folk Mood · G Major',
      instruments: '哈当厄尔小提琴 · 原声吉他 · 峡湾水浪声',
      naturalSound: 'ocean',
      prompt: '挪威峡湾北欧民谣小提琴与原声吉他，纯净冰川飞瀑，宁静治愈'
    }
  },
  {
    id: 'greatbarrierreef',
    name: '澳大利亚大堡礁与心形礁',
    enName: 'Great Barrier Reef & Heart Reef',
    location: '澳大利亚 · 昆士兰州珊瑚海',
    country: '澳大利亚',
    category: 'island',
    lat: -18.2871,
    lng: 147.6992,
    description: '太空唯一肉眼可见的生物奇迹。两千多公里色彩斑斓的珊瑚礁群如翡翠链条铺展在南太平洋碧波中，心形礁向世界传递大自然的浪漫。',
    tags: ['世界自然遗产', '世界最大珊瑚礁', '心形礁', '浮潜圣地', '南太平洋'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_wave',
      bpm: 72,
      scale: 'Tropical Coral Melody · D Major',
      instruments: '马林巴木琴 · 原声尤克里里 · 碧波涌浪',
      naturalSound: 'ocean',
      prompt: '大堡礁阳光海浪音乐，尤克里里与马林巴木琴，清澈碧海，轻快悠闲'
    }
  },
  {
    id: 'sydneyoperahouse',
    name: '澳大利亚悉尼歌剧院与海港大桥',
    enName: 'Sydney Opera House & Harbour Bridge',
    location: '澳大利亚 · 新南威尔士州悉尼',
    country: '澳大利亚',
    category: 'city',
    lat: -33.8568,
    lng: 151.2153,
    description: '二十世纪人类建筑奇迹。白帆造型宛若停泊在悉尼湾的贝壳巨舰，夕阳下与海港大桥交相辉映，渡轮划开蔚蓝海浪。',
    tags: ['世界文化遗产', '悉尼地标', '贝壳白帆', '海港大桥', '现代建筑经典'],
    photos: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_night',
      bpm: 80,
      scale: 'Modern Symphony · F Major',
      instruments: '交响管弦乐 · 钢琴主奏 · 海港潮汐',
      naturalSound: 'ocean',
      prompt: '悉尼歌剧院现代交响钢琴曲，海港落日，优雅白帆，恢弘典雅'
    }
  },
  {
    id: 'yellowstone',
    name: '美国黄石国家公园 · 大棱镜温泉',
    enName: 'Yellowstone Grand Prismatic Spring',
    location: '美国 · 怀俄明州',
    country: '美国',
    category: 'forest',
    lat: 44.5250,
    lng: -110.8382,
    description: '世界第一个国家公园。大棱镜温泉七彩斑斓如大地之眼，老忠实间歇泉准时喷涌百米水柱，野生野牛群漫步在广袤高山草甸上。',
    tags: ['世界自然遗产', '大棱镜彩泉', '老忠实间歇泉', '世界首个国家公园', '地热奇观'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 64,
      scale: 'American Wilderness · G Major',
      instruments: '民谣吉他 · 班卓琴轻拨 · 间歇泉蒸汽声',
      naturalSound: 'wind',
      prompt: '黄石公园广袤荒野乐章，原声民谣吉他与清风，七彩温泉，天地壮阔'
    }
  },
  // ==================== 8. 经典国家5A/4A景区 (National 5A/4A Scenic Wonders) ====================
  {
    id: 'gugong',
    name: '北京故宫博物院 · 紫禁城',
    enName: 'Beijing Forbidden City',
    location: '中国 · 北京市东城区',
    country: '中国',
    category: 'town',
    lat: 39.9163,
    lng: 116.3971,
    description: '六百年明清皇家宫殿建筑群，红墙金瓦，重檐飞拱。角楼倒映在护城河的碧波之中，见证着东方文明的皇皇大雅与岁月沉淀。',
    tags: ['国家5A级景区', '世界文化遗产', '紫禁城', '故宫角楼', '明清宫殿'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1599818817208-16386b86cfbe?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 65,
      scale: '宫廷五声商调 · 盛世华章',
      instruments: '编钟 · 古筝 · 洞箫 · 护城河微波',
      naturalSound: 'bell',
      prompt: '故宫红墙金瓦古典中国风纯音、古筝与编钟、恢弘悠扬、历史沉淀'
    }
  },
  {
    id: 'yiheyuan',
    name: '北京颐和园 · 万寿山与昆明湖',
    enName: 'Beijing Summer Palace',
    location: '中国 · 北京市海淀区',
    country: '中国',
    category: 'lake',
    lat: 39.9998,
    lng: 116.2755,
    description: '中国古典皇家园林之巅峰。佛香阁耸立万寿山之巅，十七孔桥金光穿洞，十七道光芒映射在昆明湖波光浩渺之中。',
    tags: ['国家5A级景区', '世界文化遗产', '皇家园林', '十七孔桥', '万寿山'],
    photos: [
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 68,
      scale: '五声羽调 · 昆明烟波',
      instruments: '琵琶 · 竹笛 · 湖水拍岸 · 远山清风',
      naturalSound: 'wind',
      prompt: '颐和园昆明湖中国风古典音乐、竹笛与琵琶、皇家园林意境、水波荡漾'
    }
  },
  {
    id: 'badaling',
    name: '八达岭长城 · 万里长城',
    enName: 'Badaling Great Wall',
    location: '中国 · 北京市延庆区',
    country: '中国',
    category: 'mountain',
    lat: 40.3582,
    lng: 116.0150,
    description: '不到长城非好汉。宛若巨龙盘踞在崇山峻岭之上，敌楼矗立，烽燧遥望。雄关漫道真如铁，见证了中华民族两千年的雄浑气魄。',
    tags: ['国家5A级景区', '世界七大奇迹', '万里长城', '八达岭', '雄关漫道'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 72,
      scale: '大国古风调 · 雄浑磅礴',
      instruments: '中国大鼓 · 战马嘶鸣泛音 · 苍茫长风',
      naturalSound: 'wind',
      prompt: '长城万里壮丽古风纯音、大鼓与弦乐、苍茫群山、雄浑大气'
    }
  },
  {
    id: 'westlake',
    name: '杭州西湖 · 断桥残雪与苏堤春晓',
    enName: 'Hangzhou West Lake',
    location: '中国 · 浙江杭州',
    country: '中国',
    category: 'lake',
    lat: 30.2428,
    lng: 120.1504,
    description: '欲把西湖比西子，淡妆浓抹总相宜。断桥残雪、雷峰夕照、三潭印月，湖山掩映之中，流淌着千百年来最浪漫动人的江南诗篇。',
    tags: ['国家5A级景区', '世界文化遗产', '断桥残雪', '西湖十景', '雷峰夕照'],
    photos: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 66,
      scale: '五声清羽调 · 钱塘韵',
      instruments: '古筝 · 洞箫 · 细雨湖波 · 晚钟微鸣',
      naturalSound: 'rain',
      prompt: '西湖断桥江南烟雨中国风、古筝独奏、轻柔舒缓、微风水波、静心治愈'
    }
  },
  {
    id: 'huangshan',
    name: '安徽黄山 · 迎客松与云海奇观',
    enName: 'Mount Huangshan',
    location: '中国 · 安徽黄山',
    country: '中国',
    category: 'mountain',
    lat: 30.1319,
    lng: 118.1694,
    description: '五岳归来不看山，黄山归来不看岳。奇松、怪石、云海、温泉、冬雪五绝冠绝天下，破石而出的迎客松傲立悬崖，风骨绝伦。',
    tags: ['国家5A级景区', '世界文化与自然双遗产', '迎客松', '黄山云海', '天下第一奇山'],
    photos: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_harp',
      bpm: 64,
      scale: '五声角调 · 云海仙境',
      instruments: '古琴 · 竖琴泛音 · 崇山松风',
      naturalSound: 'wind',
      prompt: '黄山云海仙侠意境纯乐、古琴独奏、松风阵阵、空灵超拔、东方美学'
    }
  },
  {
    id: 'taishan',
    name: '山东泰山 · 封禅极顶与日出东方',
    enName: 'Mount Tai',
    location: '中国 · 山东泰安',
    country: '中国',
    category: 'mountain',
    lat: 36.2550,
    lng: 117.1060,
    description: '五岳之首，天下第一山。登泰山而小天下，十八盘陡峭入云，玉皇顶云海日出染红万重山峰，承载着中华民族的精神图腾。',
    tags: ['国家5A级景区', '世界文化与自然双遗产', '五岳独尊', '十八盘', '泰山日出'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 70,
      scale: '齐鲁大岳调 · 岱宗气象',
      instruments: '大鼓泛音 · 编磬 · 朝阳长风',
      naturalSound: 'wind',
      prompt: '泰山极顶日出壮阔乐章、东方古风、日出云海、恢弘沉稳'
    }
  },
  {
    id: 'gulangyu',
    name: '厦门鼓浪屿 · 日光岩与琴岛海韵',
    enName: 'Gulangyu Island',
    location: '中国 · 福建厦门',
    country: '中国',
    category: 'island',
    lat: 24.4485,
    lng: 118.0674,
    description: '海上花园，音乐之岛。日光岩顶俯瞰万国建筑红瓦绿树，菽庄花园听海浪拍击礁石，转角小巷里传来悠扬的钢琴与海风声。',
    tags: ['国家5A级景区', '世界文化遗产', '钢琴之岛', '日光岩', '万国建筑'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_wave',
      bpm: 72,
      scale: '海滨大调 · 琴岛浪漫',
      instruments: '钢琴 · 尤克里里 · 碧浪拍岸 · 海鸥啼鸣',
      naturalSound: 'ocean',
      prompt: '鼓浪屿海岛钢琴曲，海浪拍岸，海风拂面，轻快治愈，夏日浪漫'
    }
  },
  {
    id: 'guilin',
    name: '桂林漓江 · 象鼻山与二十元人民币胜景',
    enName: 'Guilin Li River & Elephant Trunk Hill',
    location: '中国 · 广西桂林',
    country: '中国',
    category: 'lake',
    lat: 25.2685,
    lng: 110.2980,
    description: '桂林山水甲天下，阳朔堪称甲桂林。水绕青山山绕水，烟雨漓江之上，竹筏轻泛，渔舟唱晚，宛若行进在百里水墨画卷之中。',
    tags: ['国家5A级景区', '世界自然遗产', '象鼻山', '二十元背景图', '漓江竹筏'],
    photos: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 66,
      scale: '五声羽调 · 漓江水韵',
      instruments: '竹笛 · 芦笙 · 渔舟橹声 · 漓江清波',
      naturalSound: 'rain',
      prompt: '桂林山水漓江竹筏水墨古风纯乐、竹笛与古筝、烟雨江南、水波荡漾'
    }
  },
  {
    id: 'wudang',
    name: '湖北武当山 · 天柱峰绝顶金殿',
    enName: 'Mount Wudang Golden Summit',
    location: '中国 · 湖北十堰',
    country: '中国',
    category: 'mountain',
    lat: 32.4000,
    lng: 111.0000,
    description: '亘古无双胜境，天下第一仙山。道教圣地与太极故里，天柱峰顶铜铸鎏金大殿屹立六百年不坏，云海浩瀚，松风悠扬。',
    tags: ['国家5A级景区', '世界文化遗产', '道教圣地', '太极发源地', '金顶云海'],
    photos: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_harp',
      bpm: 60,
      scale: '道家五声微音 · 太极清虚',
      instruments: '古琴 · 埙 · 道观晨钟 · 仙山长风',
      naturalSound: 'bell',
      prompt: '武当山太极道家仙韵纯乐、古琴独奏、晨钟暮鼓、空灵脱俗、静修养心'
    }
  },
  {
    id: 'chaka',
    name: '青海茶卡盐湖 · 天空之镜',
    enName: 'Chaka Salt Lake',
    location: '中国 · 青海海西',
    country: '中国',
    category: 'lake',
    lat: 36.6961,
    lng: 99.0760,
    description: '中国的天空之镜。赤脚漫步在纯白如雪的盐晶湖面，水天一色，白云与雪山倒映在脚下，仿佛行走在天地间的纯净幻境。',
    tags: ['国家5A级景区', '天空之镜', '盐湖小火车', '水天一色', '大美青海'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 64,
      scale: '天空之镜调 · 432Hz',
      instruments: '清透钢琴 · 氛围合成器 · 高原微风',
      naturalSound: 'wind',
      prompt: '茶卡盐湖天空之镜纯净钢琴曲、水天一色、空灵透彻、极简治愈'
    }
  },
  {
    id: 'sayram',
    name: '新疆赛里木湖 · 大西洋最后一滴眼泪',
    enName: 'Sayram Lake',
    location: '中国 · 新疆博尔塔拉',
    country: '中国',
    category: 'lake',
    lat: 44.6000,
    lng: 81.1667,
    description: '大西洋暖湿气流最后眷顾的高山明珠。湛蓝如宝石的湖水拍击着草甸，远处天山雪峰傲立，初夏时节漫山野花盛放，宛若人间净土。',
    tags: ['国家5A级景区', '大西洋最后一滴眼泪', '高山冷水湖', '果子沟大桥', '天山明珠'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 68,
      scale: '西域风雅调 · 纯蓝之境',
      instruments: '冬不拉 · 木吉他 · 湖浪拍岸 · 高原清风',
      naturalSound: 'ocean',
      prompt: '赛里木湖湛蓝湖水抒情乐章、冬不拉与木吉他、辽阔大美新疆、纯净安详'
    }
  },
  {
    id: 'kanas',
    name: '新疆喀纳斯 · 神的花园与月亮湾',
    enName: 'Kanas Lake & Moon Bay',
    location: '中国 · 新疆阿勒泰',
    country: '中国',
    category: 'forest',
    lat: 48.7180,
    lng: 87.0380,
    description: '阿尔泰山深处的人间仙境。月亮湾如一弯翡翠镶嵌在金色白桦林中，晨雾蒸腾，图瓦人木屋炊烟袅袅，宛若童话世界。',
    tags: ['国家5A级景区', '国家地质公园', '月亮湾', '白哈巴村', '秋日童话'],
    photos: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 65,
      scale: '阿尔泰图瓦调 · 晨雾林海',
      instruments: '苏尔管 · 马头琴 · 喀纳斯水流声',
      naturalSound: 'wind',
      prompt: '喀纳斯秋日森林纯乐、苏尔管与马头琴、图瓦村落、晨雾弥漫、治愈悠扬'
    }
  },
  {
    id: 'zhangye',
    name: '甘肃张掖七彩丹霞 · 上帝打翻的调色盘',
    enName: 'Zhangye Rainbow Danxia',
    location: '中国 · 甘肃张掖',
    country: '中国',
    category: 'desert',
    lat: 38.9750,
    lng: 100.1417,
    description: '大自然最浓墨重彩的奇迹。红、黄、橙、绿、白各色岩层在夕阳照耀下层峦叠嶂，如锦绣彩绸披覆在祁连山麓之间。',
    tags: ['国家5A级景区', '世界地质公园', '七彩丹霞', '丝绸之路', '丹霞奇观'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_oasis',
      bpm: 72,
      scale: '丝路古调 · 七彩壮美',
      instruments: '琵琶轮指 · 箫 · 戈壁热风',
      naturalSound: 'wind',
      prompt: '张掖七彩丹霞丝路古风纯乐、琵琶与大漠长风、壮丽晚霞、色彩斑斓'
    }
  },
  {
    id: 'potala',
    name: '西藏拉萨布达拉宫 · 雪域圣殿',
    enName: 'Lhasa Potala Palace',
    location: '中国 · 西藏拉萨',
    country: '中国',
    category: 'mountain',
    lat: 29.6578,
    lng: 91.1172,
    description: '世界上海拔最高的古代宫堡建筑群。红白相间的宫殿巍峨耸立在红山之巅，金顶在雪域高原阳光下熠熠生辉，经筒转动，信仰永恒。',
    tags: ['国家5A级景区', '世界文化遗产', '雪域圣殿', '拉萨地标', '布达拉宫金顶'],
    photos: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_harp',
      bpm: 60,
      scale: '藏地圣乐调 · 432Hz',
      instruments: '铜钦法号 · 诵经泛音 · 藏族弦子 · 高原长风',
      naturalSound: 'bell',
      prompt: '布达拉宫雪域神圣纯音乐、藏族弦子与铜钦、庄严静谧、洗涤心灵'
    }
  },
  {
    id: 'pudacuo',
    name: '香格里拉普达措国家公园 · 碧塔海与属都湖',
    enName: 'Shangri-La Pudacuo National Park',
    location: '中国 · 云南迪庆',
    country: '中国',
    category: 'forest',
    lat: 27.8285,
    lng: 99.9880,
    description: '大陆首个国家公园。原始高山针叶林环抱着如镜湖泊，杜鹃花海与水草草甸相映生辉，黑颈鹤与野鸭自在游弋，心中永恒的香格里拉。',
    tags: ['国家5A级景区', '国家公园', '碧塔海', '属都湖', '香格里拉秘境'],
    photos: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 65,
      scale: '高原森林调 · 纯净生灵',
      instruments: '木吉他 · 藏笛 · 鸟鸣幽谷 · 湖水涟漪',
      naturalSound: 'birds',
      prompt: '香格里拉普达措高山森林纯音、木吉他与清脆鸟鸣、原始森林、纯净治愈'
    }
  },
  {
    id: 'wuzhizhou',
    name: '三亚蜈支洲岛 · 中国马尔代夫',
    enName: 'Wuzhizhou Island Sanya',
    location: '中国 · 海南三亚',
    country: '中国',
    category: 'island',
    lat: 18.3150,
    lng: 109.7600,
    description: '中国第一潜水胜地。海水清澈透明达27米，情人桥远眺碧海蓝天，热带珊瑚礁鱼群嬉戏穿梭，椰影婆娑，海风沉醉。',
    tags: ['国家5A级景区', '海岛度假', '潜水胜地', '情人桥', '热带风情'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_wave',
      bpm: 76,
      scale: '热带海岛大调 · 阳光假期',
      instruments: '尤克里里 · 钢鼓 · 蔚蓝浪花',
      naturalSound: 'ocean',
      prompt: '三亚蜈支洲岛热带阳光海浪音乐、尤克里里与海浪声、清爽快乐、度假放松'
    }
  },
  {
    id: 'qiandaohu',
    name: '浙江千岛湖 · 碧水千岛奇观',
    enName: 'Qiandao Lake Thousand Island',
    location: '中国 · 浙江杭州淳安',
    country: '中国',
    category: 'lake',
    lat: 29.6060,
    lng: 119.0430,
    description: '天下第一秀水。1078座翠绿岛屿宛若珍珠散落在碧波万顷的湖面之上，水质清洌见底，游船划破平静水面，画中游历。',
    tags: ['国家5A级景区', '天下第一秀水', '千岛奇观', '梅峰揽胜', '山水画廊'],
    photos: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 68,
      scale: '江南秀水调 · 432Hz',
      instruments: '古筝 · 竹笛 · 碧波微澜',
      naturalSound: 'rain',
      prompt: '千岛湖碧波千岛中国风轻音乐、竹笛与古筝、水清秀美、心旷神怡'
    }
  },
  {
    id: 'zhuozhengyuan',
    name: '苏州拙政园 · 江南古典园林之母',
    enName: 'Humble Administrator’s Garden Suzhou',
    location: '中国 · 江苏苏州',
    country: '中国',
    category: 'town',
    lat: 31.3250,
    lng: 120.6270,
    description: '中国四大名园之首。借景有方，咫尺之内再造乾坤。远香堂倚荷听风，三十六鸳鸯馆倒影浮光，吴侬软语在回廊水榭间低回流转。',
    tags: ['国家5A级景区', '世界文化遗产', '四大名园', '拙政园', '东方园林美学'],
    photos: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 65,
      scale: '苏派昆曲调 · 雅致留白',
      instruments: '昆笛 · 琵琶 · 假山飞瀑滴水',
      naturalSound: 'rain',
      prompt: '苏州园林古典雅乐纯音、昆笛与琵琶、亭台楼阁、江南雅致、回味悠长'
    }
  },
  {
    id: 'fuzimiao',
    name: '南京夫子庙 · 秦淮河风光带',
    enName: 'Nanjing Qinhuai River & Confucius Temple',
    location: '中国 · 江苏南京',
    country: '中国',
    category: 'city',
    lat: 32.0200,
    lng: 118.7880,
    description: '六朝金粉地，十里秦淮河。画舫凌波穿过文德桥，大成殿孔庙庄严，两岸雕梁画栋灯火辉煌，诉说着金陵千年文脉与六朝繁华。',
    tags: ['国家5A级景区', '十里秦淮', '夫子庙', '六朝古都', '夜游画舫'],
    photos: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_night',
      bpm: 72,
      scale: '金陵华灯调 · 诗意夜色',
      instruments: '二胡 · 琵琶 · 秦淮河水声',
      naturalSound: 'rain',
      prompt: '南京十里秦淮夜色国风纯乐、二胡与琵琶、画舫灯影、六朝烟雨、繁华与温婉'
    }
  },
  // ==================== 9. 世界享誉全球的国际著名胜景 (World Famous International Landmarks) ====================
  {
    id: 'eiffeltower',
    name: '法国巴黎 · 埃菲尔铁塔与战神广场',
    enName: 'Paris Eiffel Tower & Champ de Mars',
    location: '法国 · 巴黎第七区',
    country: '法国',
    category: 'city',
    lat: 48.8584,
    lng: 2.2945,
    description: '浪漫之都的永恒象征。钢铁巨塔拔地而起，每当夜幕降临，两万盏闪光灯点亮塞纳河畔的夜空，流淌着法兰西的优雅与深情。',
    tags: ['世界文化遗产', '巴黎地标', '浪漫之都', '塞纳河畔', '铁塔夜景'],
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_night',
      bpm: 76,
      scale: 'Parisian Chanson · C Major',
      instruments: '手风琴 · 爵士吉他 · 塞纳河微风',
      naturalSound: 'wind',
      prompt: '巴黎塞纳河手风琴香颂纯音乐、法式浪漫、夜色微光、优雅治愈'
    }
  },
  {
    id: 'louvremuseum',
    name: '法国巴黎 · 卢浮宫与玻璃金字塔',
    enName: 'Louvre Museum & Glass Pyramid',
    location: '法国 · 巴黎第一区',
    country: '法国',
    category: 'city',
    lat: 48.8606,
    lng: 2.3376,
    description: '世界四大历史博物馆之首。贝聿铭设计的玻璃金字塔倒映在拿破仑广场水池中，蒙娜丽莎与胜利女神在此沉淀人类千年的艺术巅峰。',
    tags: ['世界四大博物馆', '贝聿铭金字塔', '蒙娜丽莎', '艺术殿堂', '古典建筑'],
    photos: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_night',
      bpm: 70,
      scale: 'Baroque Chamber · G Minor',
      instruments: '大提琴 · 竖琴泛音 · 宫廷回廊回音',
      naturalSound: 'bell',
      prompt: '卢浮宫古典室内交响乐、大提琴独奏与竖琴、庄重优雅、艺术沉淀'
    }
  },
  {
    id: 'rome_colosseum',
    name: '意大利罗马 · 斗兽场与古罗马遗迹',
    enName: 'Rome Colosseum & Roman Forum',
    location: '意大利 · 拉齐奥大区罗马',
    country: '意大利',
    category: 'city',
    lat: 41.8902,
    lng: 12.4922,
    description: '永恒之城的千年见证。宏伟的拱门弧壁在落日余晖中投下深邃阴影，石柱与雕刻诉说着古罗马帝国的辉煌历史与沧桑变迁。',
    tags: ['世界新七大奇迹', '世界文化遗产', '永恒之城', '古罗马帝国', '古典建筑史诗'],
    photos: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_night',
      bpm: 68,
      scale: 'Classical Roman Epic · D Minor',
      instruments: '古典木管 · 弦乐四重奏 · 历史回响',
      naturalSound: 'wind',
      prompt: '古罗马斗兽场交响弦乐、史诗沧桑感、夕阳古迹、厚重悠扬'
    }
  },
  {
    id: 'venice_stmarks',
    name: '意大利威尼斯 · 圣马可广场与大运河贡多拉',
    enName: 'Venice Grand Canal & St. Mark’s Square',
    location: '意大利 · 威尼托大区威尼斯',
    country: '意大利',
    category: 'town',
    lat: 45.4342,
    lng: 12.3388,
    description: '亚得里亚海的水上明珠。贡多拉小船穿行在数百座石桥与水巷之间，圣马可大教堂金碧辉煌，水波荡漾着水上之都的梦幻诗篇。',
    tags: ['世界文化遗产', '水上之城', '贡多拉水巷', '叹息桥', '圣马可广场'],
    photos: [
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 65,
      scale: 'Venetian Barcarolle · 432Hz',
      instruments: '曼陀林 · 手风琴 · 运河摇橹波光',
      naturalSound: 'ocean',
      prompt: '威尼斯水城船歌纯音乐、曼陀林与手风琴、水巷波光、浪漫悠然'
    }
  },
  {
    id: 'neuschwanstein',
    name: '德国新天鹅堡 · 阿尔卑斯童话城堡',
    enName: 'Neuschwanstein Castle Bavaria',
    location: '德国 · 巴伐利亚州富森',
    country: '德国',
    category: 'mountain',
    lat: 47.5576,
    lng: 10.7498,
    description: '迪士尼城堡的灵感原型。白色尖塔耸立在阿尔卑斯翠绿峡谷之巅，云雾缭绕宛若梦幻仙境，寄托着路德维希二世的浪漫幻想。',
    tags: ['童话城堡原型', '巴伐利亚仙境', '阿尔卑斯山脉', '路德维希二世', '梦幻建筑'],
    photos: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_harp',
      bpm: 66,
      scale: 'Romantic Fairy Symphony · A Major',
      instruments: '圆号 · 竖琴 · 森林清泉鸟鸣',
      naturalSound: 'birds',
      prompt: '新天鹅堡童话交响纯乐、竖琴与管乐、梦幻森林城堡、纯净高雅'
    }
  },
  {
    id: 'sagradafamilia',
    name: '西班牙巴塞罗那 · 圣家堂',
    enName: 'Barcelona Sagrada Família',
    location: '西班牙 · 加泰罗尼亚巴塞罗那',
    country: '西班牙',
    category: 'city',
    lat: 41.4036,
    lng: 2.1744,
    description: '建筑鬼才高迪的未完史诗。森林般升腾的立柱，五彩斑斓的花窗将地中海阳光化作彩虹倾泻而下，人类向自然与上帝致敬的极致艺术。',
    tags: ['世界文化遗产', '高迪建筑杰作', '光影森林', '巴塞罗那地标', '现代主义建筑'],
    photos: [
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_night',
      bpm: 72,
      scale: 'Spanish Classical Guitar · E Minor',
      instruments: '西班牙古典吉他 · 管风琴微音 · 彩窗光芒',
      naturalSound: 'bell',
      prompt: '圣家堂西班牙古典吉他纯音乐、光影斑斓、崇高灵性、悠扬深邃'
    }
  },
  {
    id: 'acropolis_athens',
    name: '希腊雅典卫城 · 帕特农神庙',
    enName: 'Athens Acropolis & Parthenon',
    location: '希腊 · 阿提卡大区雅典',
    country: '希腊',
    category: 'city',
    lat: 37.9715,
    lng: 23.7257,
    description: '西方文明与民主思想的摇篮。高耸的多立克柱矗立在爱琴海的蓝天之下，夕阳洒在两千五百年的白色大理石上，闪烁着智慧之光。',
    tags: ['世界文化遗产', '西方文明发源地', '帕特农神庙', '雅典卫城', '爱琴海微风'],
    photos: [
      'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_night',
      bpm: 68,
      scale: 'Ancient Greek Harmony · D Major',
      instruments: '里拉琴音色 · 长笛 · 爱琴海长风',
      naturalSound: 'wind',
      prompt: '雅典卫城古希腊里拉琴风情纯乐、爱琴海蓝天、古代神庙、清澈辽远'
    }
  },
  {
    id: 'iceland_bluelagoon',
    name: '冰岛 · 蓝湖地热温泉与黄金圈瀑布',
    enName: 'Iceland Blue Lagoon & Gullfoss',
    location: '冰岛 · 格林达维克',
    country: '冰岛',
    category: 'lake',
    lat: 63.8804,
    lng: -22.4495,
    description: '冰与火之歌的世界尽头。奶蓝色的地热温泉在黑色熔岩中升腾着温暖白雾，冬夜仰望苍穹，绿色欧若拉极光在极夜中跳动起舞。',
    tags: ['世界地质奇观', '极光秘境', '冰与火之国', '蓝湖温泉', '地球尽头'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 58,
      scale: 'Nordic Aurora Ambient · 432Hz',
      instruments: '极光合成器 · 空灵钢琴 · 冰川风声',
      naturalSound: 'wind',
      prompt: '冰岛极光与蓝湖空灵氛围音乐、北欧极简钢琴、冰与火、冥想治愈'
    }
  },
  {
    id: 'statueofliberty',
    name: '美国纽约 · 自由女神像与曼哈顿天际线',
    enName: 'New York Statue of Liberty & Manhattan Skyline',
    location: '美国 · 纽约州纽约市',
    country: '美国',
    category: 'city',
    lat: 40.6892,
    lng: -74.0445,
    description: '世界大都会的无眠心跳。自由女神手擎火炬守望哈德逊河口，帝国大厦与华尔街摩天大楼森林在夕阳与夜色中璀璨生辉。',
    tags: ['世界文化遗产', '自由女神像', '曼哈顿天际线', '纽约地标', '时代广场'],
    photos: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'city_night',
      bpm: 88,
      scale: 'New York Jazz Soul · F Major',
      instruments: '萨克斯风 · 爵士钢琴 · 城市夜景节拍',
      naturalSound: 'wind',
      prompt: '纽约曼哈顿夜景爵士萨克斯纯乐、都市天际线、摩登节奏、慵懒沉醉'
    }
  },
  {
    id: 'machupicchu',
    name: '秘鲁 · 马丘比丘印加天空之城',
    enName: 'Machu Picchu Inca Citadel',
    location: '秘鲁 · 库斯科大区',
    country: '秘鲁',
    category: 'mountain',
    lat: -13.1631,
    lng: -72.5450,
    description: '安第斯山脉高耸山脊上的失落之城。梯田与巨石神庙在晨雾中若隐若现，羊驼在太阳门前悠闲漫步，人类与高原云海的永恒对话。',
    tags: ['世界新七大奇迹', '世界文化与自然双遗产', '印加帝国', '天空之城', '安第斯山脉'],
    photos: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_harp',
      bpm: 66,
      scale: 'Andean Folk · G Major',
      instruments: '排箫 · 恰朗哥琴 · 安第斯山鹰呼啸',
      naturalSound: 'wind',
      prompt: '马丘比丘安第斯排箫印加风情纯乐、高山云海、雄鹰翱翔、神秘辽阔'
    }
  },
  {
    id: 'christredeemer',
    name: '巴西里约热内卢 · 耶稣山基督像',
    enName: 'Rio de Janeiro Christ the Redeemer',
    location: '巴西 · 里约热内卢州',
    country: '巴西',
    category: 'mountain',
    lat: -22.9519,
    lng: -43.2105,
    description: '七百米驼背山顶张开双臂守护全城的巨型雕像。俯瞰科帕卡巴纳海滩与糖面包山，大西洋的海风吹拂着热带桑巴的奔放与包容。',
    tags: ['世界新七大奇迹', '里约地标', '驼背山', '桑巴之城', '大西洋海湾'],
    photos: [
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_wave',
      bpm: 82,
      scale: 'Bossa Nova Sunset · D Major',
      instruments: '波萨诺瓦尼龙吉他 · 沙锤 · 海湾落日浪涛',
      naturalSound: 'ocean',
      prompt: '里约热内卢波萨诺瓦轻柔吉他纯乐、海湾落日、热带温暖、松弛惬意'
    }
  },
  {
    id: 'salardeuyuni',
    name: '玻利维亚 · 乌尤尼盐沼天空之镜',
    enName: 'Salar de Uyuni Sky Mirror',
    location: '玻利维亚 · 波托西省',
    country: '玻利维亚',
    category: 'lake',
    lat: -20.1338,
    lng: -67.4891,
    description: '世界最大的盐沼，一万平方公里的绝对平坦。雨季时浅水覆盖形成无边无际的倒影，昼见纯白天穹，夜卧漫天银河，如同漫步星际。',
    tags: ['世界最大盐沼', '天空之镜', '银河倒影', '仙人掌岛', '纯净奇迹'],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'lake_zen',
      bpm: 60,
      scale: 'Cosmic Mirror Harmony · 432Hz',
      instruments: '氛围电钢琴 · 星空泛音 · 辽阔微风',
      naturalSound: 'wind',
      prompt: '乌尤尼盐沼天空之镜空灵音乐、星空倒影、极简钢琴、水天相接、洗涤心灵'
    }
  },
  {
    id: 'pyramids_giza',
    name: '埃及开罗 · 吉萨金字塔群与狮身人面像',
    enName: 'Giza Pyramids & Great Sphinx',
    location: '埃及 · 吉萨省开罗近郊',
    country: '埃及',
    category: 'desert',
    lat: 29.9792,
    lng: 31.1342,
    description: '古代世界七大奇迹仅存的丰碑。胡夫金字塔巍然耸立在撒哈拉黄沙之中四千五百年，狮身人面像默默凝望尼罗河的晨曦与落日。',
    tags: ['世界古代七大奇迹', '世界文化遗产', '胡夫金字塔', '狮身人面像', '尼罗河古文明'],
    photos: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_oasis',
      bpm: 65,
      scale: 'Ancient Egyptian Scale · G Minor',
      instruments: '乌德琴 · 纳伊笛 · 撒哈拉长风',
      naturalSound: 'wind',
      prompt: '埃及金字塔古埃及风情纯音乐、乌德琴与纳伊笛、沙漠夕阳、沧桑神秘'
    }
  },
  {
    id: 'tajmahal',
    name: '印度阿格拉 · 泰姬陵',
    enName: 'Taj Mahal Agra',
    location: '印度 · 北方邦阿格拉',
    country: '印度',
    category: 'town',
    lat: 27.1751,
    lng: 78.0421,
    description: '大理石雕琢的永恒泪珠。纯白大理石圆顶倒映在亚穆纳河畔的莲花池中，精美绝伦的宝石镶嵌，诉说着沙贾汗对爱妃的旷世绝恋。',
    tags: ['世界新七大奇迹', '世界文化遗产', '纯白大理石', '旷世绝恋', '莫卧儿艺术巅峰'],
    photos: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'guzheng_rain',
      bpm: 68,
      scale: 'Indian Raga Romance · C Major',
      instruments: '西塔琴 · 塔布拉鼓微音 · 水池涟漪',
      naturalSound: 'wind',
      prompt: '泰姬陵印度古典西塔琴纯音乐、纯白大理石倒影、深情悠扬、宁静圣洁'
    }
  },
  {
    id: 'angkorwat',
    name: '柬埔寨暹粒 · 吴哥窟与高棉的微笑',
    enName: 'Angkor Wat & Bayon Temple',
    location: '柬埔寨 · 暹粒省',
    country: '柬埔寨',
    category: 'forest',
    lat: 13.4125,
    lng: 103.8670,
    description: '热带丛林深处的石头奇迹。五座莲花佛塔倒映在护城河的日出朝霞中，巴戎寺二百一十六面慈悲安详的佛面，凝望着千年的风雨沧桑。',
    tags: ['世界文化遗产', '东方四大奇迹', '高棉的微笑', '吴哥日出', '热带巨树纠缠'],
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 62,
      scale: 'Khmer Mystic Harmony · 432Hz',
      instruments: '热带木琴 · 铜锣微鸣 · 丛林晨鸟',
      naturalSound: 'birds',
      prompt: '吴哥窟热带丛林古刹纯音乐、高棉微笑、晨光微露、静谧祥和'
    }
  },
  {
    id: 'cappadocia',
    name: '土耳其 · 卡帕多奇亚热气球奇石林',
    enName: 'Cappadocia Hot Air Balloons & Fairy Chimneys',
    location: '土耳其 · 内夫谢希尔省格雷梅',
    country: '土耳其',
    category: 'desert',
    lat: 38.6431,
    lng: 34.8289,
    description: '精灵烟囱与外星地貌的浪漫升腾。清晨数百只彩色热气球迎着朝阳冉冉升起，俯瞰千沟万壑的月球地貌与古老洞穴城堡。',
    tags: ['世界文化与自然双遗产', '热气球胜地', '精灵烟囱', '月球地貌', '格雷梅国家公园'],
    photos: [
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_oasis',
      bpm: 72,
      scale: 'Anatolian Dawn Melody · G Major',
      instruments: '卡龙琴 · 原声吉他 · 朝阳清风',
      naturalSound: 'wind',
      prompt: '卡帕多奇亚热气球日出纯乐、土耳其卡龙琴与木吉他、浪漫升腾、视野开阔'
    }
  },
  {
    id: 'serengeti',
    name: '坦桑尼亚 · 塞伦盖蒂大草原野生动物大迁徙',
    enName: 'Serengeti National Park Great Migration',
    location: '坦桑尼亚 · 塞伦盖蒂',
    country: '坦桑尼亚',
    category: 'forest',
    lat: -2.3333,
    lng: 34.8333,
    description: '地球上最壮丽的生命交响诗。数百万角马与斑马跨越马拉河，金合欢树在非洲火红夕阳下勾勒出苍茫剪影，大自然生生不息的原始力量。',
    tags: ['世界自然遗产', '动物大迁徙', '塞伦盖蒂大草原', '非洲五霸', '生命奇观'],
    photos: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'forest_zen',
      bpm: 78,
      scale: 'African Savannah Rhythms · D Major',
      instruments: '卡林巴琴 · 拇指琴 · 非洲大地鼓声 · 草原微风',
      naturalSound: 'wind',
      prompt: '塞伦盖蒂非洲草原纯乐、卡林巴琴与轻柔手鼓、落日金合欢树、辽阔苍茫'
    }
  },
  {
    id: 'borabora_island',
    name: '法属波利尼西亚 · 大溪地波拉波拉岛',
    enName: 'Bora Bora Overwater Paradise Tahiti',
    location: '法属波利尼西亚 · 社会群岛',
    country: '法属波利尼西亚',
    category: 'island',
    lat: -16.5004,
    lng: -151.7415,
    description: '太平洋上的梦幻绿松石。奥特马努山峰拔海而起，泻湖呈现出渐变的宝石蓝与薄荷绿，水上木屋直通清澈海底，人间天堂的终极定义。',
    tags: ['太平洋明珠', '水上木屋', '绿松石泻湖', '大溪地风情', '蜜月度假胜地'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_wave',
      bpm: 70,
      scale: 'Polynesian Ukulele Breeze · C Major',
      instruments: '大溪地尤克里里 · 舒缓吉他 · 碧海清波',
      naturalSound: 'ocean',
      prompt: '波拉波拉岛热带海岛纯乐、尤克里里与海浪拍岸、阳光泻湖、无忧无虑'
    }
  },
  {
    id: 'antarctica_lemaire',
    name: '南极洲 · 勒梅尔海峡冰川与企鹅海湾',
    enName: 'Antarctica Lemaire Channel & Penguin Bay',
    location: '南极洲 · 南极半岛',
    country: '南极洲',
    category: 'mountain',
    lat: -65.1319,
    lng: -63.9533,
    description: '地球最南端的纯白史诗。千米冰崖峭壁夹峙着如镜航道，浮冰上帽带企鹅憨态可掬，座头鲸跃出海面，第七大陆无与伦比的寂静与圣洁。',
    tags: ['第七大陆', '极地冰川', '勒梅尔海峡', '企鹅王国', '地球最后净土'],
    photos: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_harp',
      bpm: 56,
      scale: 'Polar Glacier Serenity · 432Hz',
      instruments: '水晶清脆合成器 · 极地大提琴 · 冰川崩落回响',
      naturalSound: 'wind',
      prompt: '南极洲极地纯净空灵音乐、水晶清音与冰川长风、纯白无瑕、净化心灵'
    }
  },

  // ==================== 15. 全球大洋待认领秘境 (Unclaimed Ocean & Remote Mysteries) ====================
  {
    id: 'mariana-trench',
    name: '马里亚纳海沟 · 挑战者深渊',
    enName: 'Mariana Trench · Challenger Deep',
    location: '西太平洋 · 万米海渊 (-11,034米)',
    country: '西太平洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 11.3493,
    lng: 142.1996,
    description: '【待认领秘境】地球的最深处，万米幽暗深渊。这里承受着超过1000倍的大气压，寂静无光的世界中，水声回荡在幽蓝海沟深处，等待勇敢者的声呐探索与图文认领。',
    tags: ['待认领', '挑战者深渊', '地球极深处', '神秘海沟', '深海探索'],
    photos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'deep_ocean_ambient',
      bpm: 52,
      scale: 'Deep Abyss Drone · 432Hz',
      instruments: '深海水听器共鸣 · 极低频波纹 · 鲸歌远鸣',
      naturalSound: 'waves',
      prompt: '深海万米深渊环境音、水下低频共振、神秘鲸鸣、深邃治愈助眠'
    }
  },
  {
    id: 'point-nemo',
    name: '尼莫点 · 太平洋海洋难抵极',
    enName: 'Point Nemo · Oceanic Pole of Inaccessibility',
    location: '南太平洋 · 航天器重返墓地',
    country: '南太平洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -48.8767,
    lng: -123.3933,
    description: '【待认领秘境】地球上距离任何陆地最遥远的点（2,688公里）。最近的人类往往是头顶400公里呼啸而过的国际空间站宇航员。万籁俱寂的浩瀚大洋，等待探险者留下足迹。',
    tags: ['待认领', '海洋难抵极', '航天器坟场', '绝对孤独', '深洋绝境'],
    photos: [
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'deep_ocean_ambient',
      bpm: 48,
      scale: 'Infinite Solitude · 528Hz',
      instruments: '微风泛音合成器 · 孤舟水波 · 远古潮汐',
      naturalSound: 'waves',
      prompt: '无垠太平洋、深邃孤寂、远方微弱海浪声、静心冥想与深度睡眠'
    }
  },
  {
    id: 'bermuda-triangle',
    name: '百慕大神秘三角 · 罗盘静默海域',
    enName: 'Bermuda Triangle · Sargasso Western Apex',
    location: '北大西洋 · 萨尔加斯海西界',
    country: '北大西洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 25.0000,
    lng: -71.0000,
    description: '【待认领秘境】传说的迷航漩涡，磁暴与洋流交织的神秘水域。碧蓝的海水之下潜藏着无数失落的航船残骸与古代传说，星轨在深邃波涛中静默轮转。',
    tags: ['待认领', '神秘三角', '大西洋传说', '罗盘失灵', '深蓝洋流'],
    photos: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_mystery',
      bpm: 60,
      scale: 'Atlantic Mystery · 432Hz',
      instruments: '神秘流音管弦 · 潮汐鼓动 · 磁场脉冲晶音',
      naturalSound: 'waves',
      prompt: '大西洋神秘洋流、悠远深邃、潮水呼吸声、探索冥想氛围'
    }
  },
  {
    id: 'easter-island-abyss',
    name: '复活节岛外海 · 摩艾巨石注视之海',
    enName: 'Easter Island Trench · Rapa Nui Seamount',
    location: '东南太平洋 · 拉帕努伊海盆',
    country: '东南太平洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -27.1127,
    lng: -109.3497,
    description: '【待认领秘境】孤悬于浩瀚太平洋中央的神秘孤岛，千万年来数百座石雕摩艾像静静注视着无垠的海平面，海浪拍击火山礁岩，诉说着古波利尼西亚的航海史诗。',
    tags: ['待认领', '摩艾石像', '孤绝之岛', '星空航海', '古老图腾'],
    photos: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_mystery',
      bpm: 64,
      scale: 'Polynesian Winds · 432Hz',
      instruments: '木排箫 · 土著鼓点轻击 · 礁岩浪花',
      naturalSound: 'waves',
      prompt: '太平洋古老海岛风情、木箫悠扬、火山海浪拍打、治愈心灵'
    }
  },
  {
    id: 'galapagos-rift',
    name: '加拉帕戈斯深海热泉 · 地心黑烟囱',
    enName: 'Galapagos Hydrothermal Rift',
    location: '东太平洋 · 赤道热泉深渊 (-2,600米)',
    country: '东太平洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 0.8000,
    lng: -90.9000,
    description: '【待认领秘境】太平洋海底板块碰撞交汇处，喷涌着300°C矿脉热液的海底烟囱，孕育着地球上最不可思议的嗜热生物圈，仿佛异星球的外星地貌。',
    tags: ['待认领', '海底烟囱', '深海热泉', '达尔文秘境', '地心生命'],
    photos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'deep_ocean_ambient',
      bpm: 54,
      scale: 'Thermal Vent Pulse · 432Hz',
      instruments: '地热气泡声 · 深海回音合成器 · 恒定低频',
      naturalSound: 'waves',
      prompt: '深海热泉环境音、地热气泡律动、低频放松、科幻氛围纯音乐'
    }
  },
  {
    id: 'tahiti-blue-hole',
    name: '大溪地与波利尼西亚 · 琉璃蓝洞',
    enName: 'Tahiti & Polynesia · Coral Blue Hole',
    location: '南太平洋 · 法属波利尼西亚深海',
    country: '南太平洋',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -17.6509,
    lng: -149.4260,
    description: '【待认领秘境】深邃如蓝宝石般的环礁深坑，阳光穿透透明度极高的琉璃海水，五彩斑斓的珊瑚与鳐鱼在百米深蓝中翱翔，大洋深处的梦幻伊甸园。',
    tags: ['待认领', '深海蓝洞', '玻璃海水', '珊瑚环礁', '南太平洋之珠'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'tropical_chill',
      bpm: 66,
      scale: 'Turquoise Lagoon · 432Hz',
      instruments: '钢舌鼓 · 尤克里里微泛音 · 清透波浪',
      naturalSound: 'waves',
      prompt: '大溪地海风微波、清澈阳光、舒缓空灵钢舌鼓、假日放松'
    }
  },
  {
    id: 'mauritius-underwater-waterfall',
    name: '毛里求斯 · 印度洋海底瀑布',
    enName: 'Mauritius · Underwater Waterfall',
    location: '西南印度洋 · 勒莫恩半岛海域',
    country: '印度洋',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -20.4717,
    lng: 57.3175,
    description: '【待认领秘境】大自然最震撼的视觉奇迹。海面之下细沙和淤泥顺着大陆架断崖奔流跌入4000米深海，勾勒出如同海底奔腾瀑布般的壮丽奇观。',
    tags: ['待认领', '海底瀑布', '大陆架断崖', '印度洋秘境', '地质奇迹'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_mystery',
      bpm: 70,
      scale: 'Cascading Abyss · 432Hz',
      instruments: '竖琴流连 · 弦乐潮涌 · 远洋水声',
      naturalSound: 'waves',
      prompt: '海底瀑布流动质感、舒缓优美竖琴、深海回响、空灵浩瀚'
    }
  },
  {
    id: 'java-trench',
    name: '爪哇海沟 · 巽他深渊',
    enName: 'Java Trench · Sunda Deep Abyss',
    location: '东印度洋 · 巽他海沟 (-7,450米)',
    country: '东印度洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -10.3167,
    lng: 105.9833,
    description: '【待认领秘境】印度洋最深的海沟，欧亚板块与印度-澳洲板块的俯冲前沿。海水在万米重压下宛如深黑水晶，深海发光生物在暗夜波涛中闪烁点点星火。',
    tags: ['待认领', '印度洋极深', '巽他深渊', '发光生物', '板块俯冲'],
    photos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'deep_ocean_ambient',
      bpm: 50,
      scale: 'Sunda Trench Echo · 432Hz',
      instruments: '深水共鸣器 · 空间合成器 · 缓流低音',
      naturalSound: 'waves',
      prompt: '印度洋深渊冥想音、水流回旋、暗夜星光、深沉宁静'
    }
  },
  {
    id: 'drake-passage',
    name: '德雷克海峡 · 魔鬼西风漂流带',
    enName: 'Drake Passage · Furious Fifties Sea',
    location: '南大洋 · 合恩角南侧西风漂流带',
    country: '南大洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -58.5000,
    lng: -65.0000,
    description: '【待认领秘境】世界上最汹涌危险的海峡，大西洋与太平洋狂暴碰撞之所。滔天巨浪奔腾在咆哮的西风带中，信天翁振翅滑翔于苍茫冰冷的大洋之上。',
    tags: ['待认领', '咆哮西风带', '狂暴巨浪', '南极门户', '极限航海'],
    photos: [
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_mystery',
      bpm: 58,
      scale: 'Furious Winds · 432Hz',
      instruments: '低音大提琴 · 暴风雨海浪 · 悠长长笛',
      naturalSound: 'wind',
      prompt: '极地风暴与怒涛、大提琴苍茫旋律、震撼壮美、航海史诗'
    }
  },
  {
    id: 'azores-rift',
    name: '亚速尔大西洋洋中脊 · 抹香鲸领地',
    enName: 'Mid-Atlantic Ridge · Azores Whale Territory',
    location: '北大西洋 · 洋中脊地质断裂带',
    country: '北大西洋',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 37.7412,
    lng: -25.6756,
    description: '【待认领秘境】地球最大的海底山脉——大西洋洋中脊露出海面的火山群岛。地热温泉与翡翠火山湖交相辉映，深海抹香鲸常年在此巡游繁衍。',
    tags: ['待认领', '大西洋洋中脊', '抹香鲸圣地', '火山温泉', '深海裂谷'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_mystery',
      bpm: 62,
      scale: 'Atlantic Cetacean · 432Hz',
      instruments: '清脆钢琴 · 鲸语声纳 · 潮汐和声',
      naturalSound: 'waves',
      prompt: '大西洋抹香鲸呼唤、钢琴纯音乐、潮水轻拂、治愈放松'
    }
  },
  {
    id: 'north-pole-abyss',
    name: '北极极点冰海 · 永夜极光之洋',
    enName: 'North Pole Arctic Abyss · Aurora Ocean',
    location: '北冰洋 · 地球地理北极点 (-4,261米)',
    country: '北冰洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 89.9000,
    lng: 0.0000,
    description: '【待认领秘境】所有经线汇聚的尽头，冰封千里的极地浮冰世界。厚重的极地冰盖下方是4000米深的深寒海盆，极光在永夜星空中如绿色丝带般轻盈舞动。',
    tags: ['待认领', '地理北极', '极夜冰盖', '北极光', '地球尽头'],
    photos: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'polar_ambient',
      bpm: 50,
      scale: 'Northern Lights · 432Hz',
      instruments: '极光合成器 · 冰晶清音 · 极地微风',
      naturalSound: 'wind',
      prompt: '北极极光漫舞、纯净冰雪氛围、空灵空境、冥想安神'
    }
  },
  {
    id: 'ross-sea-shelf',
    name: '罗斯海陆架 · 极寒冰山漂流带',
    enName: 'Ross Sea Ice Shelf · Drifting Icebergs',
    location: '南极洲 · 罗斯海冰架前缘',
    country: '南大洋',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -75.0000,
    lng: 175.0000,
    description: '【待认领秘境】地球上最纯净原始的海洋，巨大的蓝色冰山崩解漂流在幽暗深海。虎鲸与帝企鹅在这片极寒荒野中繁衍生息，南极大陆架在此沉入深渊。',
    tags: ['待认领', '南极冰架', '虎鲸领地', '极寒冰洋', '纯净秘境'],
    photos: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'polar_ambient',
      bpm: 52,
      scale: 'Antarctic Shelf · 432Hz',
      instruments: '冰川共振大提琴 · 空灵女声哼唱 · 寒潮轻抚',
      naturalSound: 'wind',
      prompt: '南极洲极寒冰洋、纯白圣洁、低沉大提琴、治愈心灵'
    }
  },
  {
    id: 'tristan-da-cunha',
    name: '特里斯坦-达库尼亚 · 世界最孤立海岛',
    enName: 'Tristan da Cunha · Most Remote Island',
    location: '南大西洋 · 孤绝火山岛',
    country: '南大西洋',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -37.1052,
    lng: -12.2777,
    description: '【待认领秘境】远离任何大陆超过2400公里的孤绝火山岛，常年被南大洋的风暴与云雾笼罩，黑沙滩与狂暴的海浪守卫着这片与世隔绝的海角天涯。',
    tags: ['待认领', '世界最孤立', '黑沙滩', '南大西洋', '避世秘境'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_mystery',
      bpm: 60,
      scale: 'Tristan Solitude · 432Hz',
      instruments: '木吉他轻拂 · 海风长吟 · 潮水起落',
      naturalSound: 'waves',
      prompt: '世界尽头孤岛、温暖木吉他、海风浪涌、宁静致远'
    }
  },
  {
    id: 'eye-of-the-sahara',
    name: '撒哈拉之眼 · 理查特同心圆地质奇观',
    enName: 'Eye of the Sahara · Richat Structure',
    location: '非洲 · 毛里塔尼亚撒哈拉腹地',
    country: '毛里塔尼亚',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 21.1269,
    lng: -11.4016,
    description: '【待认领秘境】宇航员从太空俯瞰地球的地标级同心圆地质奇观。直径达40公里的巨大同心圆圈，被誉为地球最神秘的巨型图腾，传说中亚特兰蒂斯的遗迹假说之地。',
    tags: ['待认领', '撒哈拉之眼', '地质奇观', '太空地标', '古老谜题'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_ambient',
      bpm: 64,
      scale: 'Sahara Mystery · 432Hz',
      instruments: '乌德琴 · 撒哈拉热风 · 远古颂钵',
      naturalSound: 'wind',
      prompt: '撒哈拉沙漠苍茫神秘、乌德琴轻拨、热风滚滚、宇宙俯瞰感'
    }
  },
  {
    id: 'danakil-depression',
    name: '达纳基尔凹地 · 地狱之门硫磺幻境',
    enName: 'Danakil Depression · Acidic Sulfur Springs',
    location: '非洲 · 埃塞俄比亚阿法尔三角 (-125米)',
    country: '埃塞俄比亚',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 14.2417,
    lng: 40.5000,
    description: '【待认领秘境】低于海平面125米的地球最热极端秘境。色彩斑斓的酸性硫磺泉、盐结晶梯田与滚烫的熔岩湖交织，宛如火星表面的残酷超现实绝景。',
    tags: ['待认领', '地球地狱之门', '硫磺泉', '火星地貌', '极端探险'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_ambient',
      bpm: 58,
      scale: 'Volcanic Acid · 432Hz',
      instruments: '实验电子合成器 · 地壳微鸣 · 原始鼓韵',
      naturalSound: 'wind',
      prompt: '外星地貌神秘音乐、硫磺泉地热回响、科幻史诗、张力与放松'
    }
  },
  {
    id: 'socotra-archipelago',
    name: '索科特拉岛 · 外星龙血树方舟',
    enName: 'Socotra Archipelago · Dragon Blood Realm',
    location: '阿拉伯海 · 索科特拉深海台地',
    country: '阿拉伯海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 12.4634,
    lng: 53.8237,
    description: '【待认领秘境】印度洋上的外星植物方舟。造型奇特如飞碟般的龙血树矗立在白沙悬崖之巅，蔚蓝深海与原始红白相间的岩石海岸构成不可思议的梦境世界。',
    tags: ['待认领', '龙血树', '外星植物方舟', '阿拉伯海', '遗世孤岛'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'ocean_mystery',
      bpm: 66,
      scale: 'Dragon Blood Tree · 432Hz',
      instruments: '阿拉伯短笛 · 柔和手碟 · 碧海轻波',
      naturalSound: 'waves',
      prompt: '索科特拉异域梦境、手碟空灵、微风海浪、奇幻治愈'
    }
  },
  {
    id: 'hawaii-seamount',
    name: '夏威夷海岭 · 太平洋海底火山链',
    enName: 'Hawaiian Ridge Seamount · Hotspot Chain',
    location: '中太平洋 · 夏威夷海底火山热点',
    country: '中太平洋',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 21.3069,
    lng: -157.8583,
    description: '【待认领秘境】从太平洋底6000米平原拔地而起的巨型海底火山脉。炽热地幔柱喷涌出的炽热岩浆与冰冷深海激荡，孕育了太平洋最壮丽的岛弧链。',
    tags: ['待认领', '海底火山', '热点地质', '深洋海岭', '太平洋之冠'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'tropical_chill',
      bpm: 68,
      scale: 'Pacific Hotspot · 432Hz',
      instruments: '滑音吉他 · 尤克里里 · 太平洋暖流',
      naturalSound: 'waves',
      prompt: '夏威夷暖洋海浪、清爽滑音吉他、舒缓放松、海边阳光'
    }
  },
  {
    id: 'palau-dropoff',
    name: '帕劳大断崖 · 黄金水母湖与万米深蓝',
    enName: 'Palau Big Drop-off & Jellyfish Lake',
    location: '西太平洋 · 密克罗尼西亚深渊',
    country: '帕劳',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 7.5149,
    lng: 134.5825,
    description: '【待认领秘境】从一米浅礁瞬间坠入上千米深渊的无底大断崖。深蓝海水清澈见底，数以万计的无毒黄金水母在隐秘盐水湖中随日落光影缓慢起舞。',
    tags: ['待认领', '无底断崖', '黄金水母湖', '七彩珊瑚', '潜水圣殿'],
    photos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'tropical_chill',
      bpm: 60,
      scale: 'Golden Jellyfish · 432Hz',
      instruments: '水下钟琴 · 柔润气泡泛音 · 暖流水声',
      naturalSound: 'waves',
      prompt: '水母优雅起舞、轻柔水下钟琴、清澈晶莹、沉浸式解压'
    }
  },
  {
    id: 'cook-islands-atoll',
    name: '库克群岛 · 艾图塔基绿松石泄湖',
    enName: 'Cook Islands · Aitutaki Coral Lagoon',
    location: '南太平洋 · 艾图塔基环礁',
    country: '库克群岛',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -21.2367,
    lng: -159.7777,
    description: '【待认领秘境】南太平洋最清澈的绿松石泄湖，巨大珊瑚环礁如同一串珍珠散落在深邃的南太平洋怀抱中，微风轻拂椰林，海浪低语宛如天籁。',
    tags: ['待认领', '绿松石泄湖', '南太平洋环礁', '治愈海浪', '世外桃源'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'tropical_chill',
      bpm: 64,
      scale: 'Turquoise Atoll · 432Hz',
      instruments: '海风木吉他 · 温柔海潮 · 鸟鸣清脆',
      naturalSound: 'waves',
      prompt: '南太平洋海岛清晨、木吉他微风、浪涛拍岸、心灵净化'
    }
  },
  {
    id: 'weddell-sea-abyss',
    name: '威德尔海 · 坚忍号传奇沉睡之海',
    enName: 'Weddell Sea Abyss · Endurance Resting Deep',
    location: '南大洋 · 坚忍号沉船海域 (-3,000米)',
    country: '南大洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -72.0000,
    lng: -45.0000,
    description: '【待认领秘境】南大洋深处著名的常年封冻海域，沙克尔顿男爵“坚忍号”传奇沉没百年的安息之地。海水透明度达到极致，冰山在极昼阳光下折射出幽蓝冷光。',
    tags: ['待认领', '坚忍号传奇', '透明冰洋', '南极风暴', '极地探险'],
    photos: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'polar_ambient',
      bpm: 50,
      scale: 'Endurance Legend · 432Hz',
      instruments: '深沉大提琴 · 极地冰层微裂回响 · 远方呼啸',
      naturalSound: 'wind',
      prompt: '极地探险史诗、坚忍不拔的深沉大提琴、冰风凛冽、浩然致敬'
    }
  },
  {
    id: 'simpson-desert',
    name: '辛普森沙漠 · 澳洲红色千垄沙原',
    enName: 'Simpson Desert · Red Dune Field',
    location: '澳洲内陆 · 红色大沙丘阵',
    country: '澳大利亚',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -24.5700,
    lng: 137.4300,
    description: '【待认领秘境】世界上最辽阔的平行红色沙丘群。超过1100道鲜红沙垄自南向北延绵数百公里，夕阳下整片荒野燃烧如火焰海洋，寂静空旷至极。',
    tags: ['待认领', '红色沙丘', '澳洲红土荒原', '平行沙垄', '内陆秘境'],
    photos: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'desert_ambient',
      bpm: 62,
      scale: 'Red Earth Dreamtime · 432Hz',
      instruments: '迪吉里杜管共鸣 · 荒原微风 · 原野打击乐',
      naturalSound: 'wind',
      prompt: '澳洲红土地、迪吉里杜管深沉原生态低音、大漠旷野、广袤冥想'
    }
  },
  {
    id: 'kamchatka-volcanoes',
    name: '堪察加半岛 · 冰火交织火山带',
    enName: 'Kamchatka Volcanoes · Pacific Ring of Fire',
    location: '俄罗斯远东 · 环太平洋火山地震带',
    country: '俄罗斯',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 55.5000,
    lng: 158.5000,
    description: '【待认领秘境】冰与火交织的远东秘境。数十座高耸入云的活火山终年喷吐着白色蒸汽，间歇泉在积雪深谷中奔腾，棕熊在未被人类踏足的原始河谷中捕食马哈鱼。',
    tags: ['待认领', '冰与火之歌', '活火山链', '远东旷野', '地热间歇泉'],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'mountain_harp',
      bpm: 65,
      scale: 'Volcano & Ice · 432Hz',
      instruments: '大提琴 · 间歇泉蒸汽声 · 冰川长笛',
      naturalSound: 'wind',
      prompt: '冰火交织的火山高原、雄浑深沉旋律、风声水响、心旷神怡'
    }
  },
  {
    id: 'sargasso-sea',
    name: '马尾藻海 · 大西洋无岸之海',
    enName: 'Sargasso Sea · Shoreless Ocean Gyre',
    location: '北大西洋 · 环流中央无岸海',
    country: '北大西洋公海',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: 28.0000,
    lng: -40.0000,
    description: '【待认领秘境】地球上唯一没有陆地海岸线的“洋中之海”。四大洋流环绕出的宁静风眼，漂浮着数百万吨金黄色的马尾藻，鳗鱼跨越数千公里在此产卵繁殖。',
    tags: ['待认领', '无岸之海', '马尾藻森林', '大西洋风眼', '自然奇观'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'deep_ocean_ambient',
      bpm: 56,
      scale: 'Sargasso Drift · 432Hz',
      instruments: '静谧电钢琴 · 浮游生物水泡音 · 缓慢洋流',
      naturalSound: 'waves',
      prompt: '无岸之海慢速漂流、清澈电钢琴、舒缓洋流白噪音、安神助眠'
    }
  },
  {
    id: 'seychelles-amirante',
    name: '塞舌尔阿米兰特 · 印度洋珊瑚孤礁',
    enName: 'Seychelles Amirante · Granite Abyss',
    location: '西印度洋 · 花岗岩孤礁海域',
    country: '塞舌尔',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -5.5000,
    lng: 53.3000,
    description: '【待认领秘境】西印度洋辽阔的碧蓝海面，古老的花岗岩巨石从深海拔地而起，巨龟在无人珊瑚沙洲上缓缓踱步，海水呈现梦幻般的层级渐变蓝。',
    tags: ['待认领', '花岗岩海岛', '印度洋珍珠', '渐变蓝海水', '巨龟乐园'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'tropical_chill',
      bpm: 64,
      scale: 'Indian Ocean Breeze · 432Hz',
      instruments: '手碟温润音 · 浪花漱石 · 暖风低语',
      naturalSound: 'waves',
      prompt: '印度洋温暖海风、手碟治愈纯音、海浪轻抚珊瑚沙滩、放松身心'
    }
  },
  {
    id: 'kerguelen-islands',
    name: '克尔格伦群岛 · 南印度洋绝望荒岛',
    enName: 'Kerguelen Islands · Desolation Archipelago',
    location: '南印度洋 · 法属南部与南极领地',
    country: '南印度洋',
    category: 'unclaimed',
    isUnclaimed: true,
    lat: -49.3500,
    lng: 69.5800,
    description: '【待认领秘境】被称为“荒凉之岛”的南印度洋孤岛。常年被50节烈风与暴雨冰雪洗礼，峡湾纵横交错，象海豹群与企鹅在黑色玄武岩海岸繁衍生息。',
    tags: ['待认领', '荒凉之岛', '南极辐合带', '狂风暴雨', '玄武岩峡湾'],
    photos: [
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85'
    ],
    audioRecipe: {
      style: 'polar_ambient',
      bpm: 54,
      scale: 'Desolation Fjord · 432Hz',
      instruments: '大提琴 solo · 暴风雨海潮 · 苍凉号角',
      naturalSound: 'wind',
      prompt: '南印度洋狂风海峡、苍凉大提琴、冰冷海浪撞击、旷世孤独'
    }
  }
];

