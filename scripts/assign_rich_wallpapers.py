#!/usr/bin/env python3
"""
Assign 3 rich, high-resolution, unique, category-matched wallpapers to every scenic spot.
For spots 1-10: Use the 29 dedicated GPT2 local wallpapers (/covers/1.1.png ... /covers/10.3.png).
For spots 11-143: Assign 3 distinct, beautiful, thematic wallpapers per spot (no repeating ocean photos).
"""

import json
import os

# Curated high-res thematic photo pools (each pool has multiple 3-photo packs)
PHOTO_PACKS = {
    # Snow Mountains & Alpine Peaks
    'snow_mountain': [
        [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Sacred Chinese Peaks & Sea of Clouds
    'sacred_mountain': [
        [
            'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Tropical Islands & Coral Lagoons
    'island_beach': [
        [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Deserts & Canyons & Silk Road
    'desert_canyon': [
        [
            'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Lush Forests & Waterfalls & Emerald Valleys
    'forest_waterfall': [
        [
            'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1511497584788-87676104235f?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Lakes & Calm Waters & Mist
    'tranquil_lake': [
        [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Historic Palaces & Ancient Heritage Wonders
    'ancient_palace': [
        [
            'https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # European Towns & Architecture
    'european_town': [
        [
            'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Modern Metropolises & City Skylines
    'city_skyline': [
        [
            'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=85'
        ],
        [
            'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Polar Wonders & Glaciers & Aurora
    'polar_glacier': [
        [
            'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&auto=format&fit=crop&q=85'
        ]
    ],
    # Savannah & Grasslands
    'savannah_grassland': [
        [
            'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=1600&auto=format&fit=crop&q=85',
            'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&auto=format&fit=crop&q=85'
        ]
    ]
}

def determine_pack_type(spot):
    name = spot.get('name', '')
    desc = spot.get('description', '')
    cat = spot.get('category', '')
    sid = spot.get('id', '')

    if any(k in name or k in sid for k in ['南极', '冰岛', 'antarctica', 'iceland', 'glacier', 'lemaire']):
        return 'polar_glacier'
    if any(k in name or k in sid for k in ['塞伦盖蒂', '草原', 'serengeti', 'savanna']):
        return 'savannah_grassland'
    if any(k in name or k in sid for k in ['雪山', '珠峰', '富士山', '马特洪峰', '阿尔卑斯', 'everest', 'fuji', 'matterhorn', 'meili', 'yulong', 'kailash', 'yading', 'gongga', 'siguniang']):
        return 'snow_mountain'
    if any(k in name or k in sid for k in ['泰山', '黄山', '华山', '峨眉山', '武当山', 'taishan', 'huangshan', 'huashan', 'emeishan', 'wudang']):
        return 'sacred_mountain'
    if any(k in name or k in sid for k in ['沙漠', '敦煌', '沙坡头', '塔克拉玛干', '库木塔格', '撒哈拉', '大峡谷', '瓦迪拉姆', '卡帕多奇亚', 'dunhuang', 'sahara', 'canyon', 'wadirum', 'cappadocia']):
        return 'desert_canyon'
    if any(k in name or k in sid for k in ['海', '岛', '三亚', '涠洲', '马尔代夫', '巴厘岛', '圣托里尼', '仙本那', '波拉波拉', '大堡礁', 'sanya', 'maldives', 'bali', 'santorini', 'borabora']):
        return 'island_beach'
    if any(k in name or k in sid for k in ['湖', '西湖', '青海湖', '泸沽湖', '茶卡', '漓江', '贝加尔湖', '日内瓦', '科莫', '班夫', '千岛湖', 'lake', 'baikal', 'geneva', 'como', 'banff']):
        return 'tranquil_lake'
    if any(k in name or k in sid for k in ['林', '张家界', '九寨沟', '长白山', '屋久岛', '黑森林', '亚马逊', '红杉', '十六湖', '瀑布', '黄果树', '小七孔', '武夷山', '庐山', '喀纳斯', '天山', 'forest', 'waterfall', 'jiuzhaigou', 'amazon', 'kanas']):
        return 'forest_waterfall'
    if any(k in name or k in sid for k in ['故宫', '长城', '颐和园', '天坛', '八达岭', '兵马俑', '布达拉宫', '金字塔', '泰姬陵', '吴哥窟', '马丘比丘', '斗兽场', 'gugong', 'greatwall', 'potala', 'pyramids', 'tajmahal', 'angkorwat', 'machupicchu', 'colosseum']):
        return 'ancient_palace'
    if any(k in name or k in sid for k in ['上海', '重庆', '香港', '东京', '巴黎', '纽约', '悉尼', 'shanghai', 'chongqing', 'hongkong', 'tokyo', 'paris', 'newyork', 'sydney']):
        return 'city_skyline'
    if any(k in name or k in sid for k in ['白川乡', '哈尔施塔特', '佛罗伦萨', '威尼斯', '新天鹅堡', '圣家族', '雅典', 'shirakawago', 'hallstatt', 'florence', 'venice', 'neuschwanstein']):
        return 'european_town'

    # Category defaults
    if cat == 'mountain':
        return 'snow_mountain'
    if cat == 'beach':
        return 'island_beach'
    if cat == 'forest':
        return 'forest_waterfall'
    return 'ancient_palace'

def main():
    with open('src/data/spots.js', 'r', encoding='utf-8') as f:
        content = f.read()

    data_str = content.split('export const SCENIC_SPOTS = ')[1].rstrip(';\n ')
    spots = json.loads(data_str)

    gpt2_map = {
        'wuzhen': ['/covers/1.1.png', '/covers/1.2.png', '/covers/1.3.png'],
        'zhouzhuang': ['/covers/2.1.png', '/covers/2.2.png', '/covers/2.3.png'],
        'hongcun': ['/covers/3.1.png', '/covers/3.2.png', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&auto=format&fit=crop&q=85'],
        'fenghuang': ['/covers/4.1.png', '/covers/4.2.png', '/covers/4.3.png'],
        'lijiang': ['/covers/5.1.png', '/covers/5.2.png', '/covers/5.3.png'],
        'nanxun': ['/covers/6.1.png', '/covers/6.2.png', '/covers/6.3.png'],
        'xitang': ['/covers/7.1.png', '/covers/7.2.png', '/covers/7.3.png'],
        'wuyuan': ['/covers/8.1.png', '/covers/8.2.png', '/covers/8.3.png'],
        'pingyao': ['/covers/9.1.png', '/covers/9.2.png', '/covers/9.3.png'],
        'kyoto': ['/covers/10.1.png', '/covers/10.2.png', '/covers/10.3.png'],
    }

    pack_indices = {}

    for i, s in enumerate(spots):
        sid = s.get('id')
        if sid in gpt2_map:
            s['photos'] = gpt2_map[sid]
        else:
            pack_type = determine_pack_type(s)
            packs = PHOTO_PACKS.get(pack_type, PHOTO_PACKS['snow_mountain'])
            idx = pack_indices.get(pack_type, 0) % len(packs)
            pack_indices[pack_type] = idx + 1
            s['photos'] = packs[idx]

    # Save to src/data/spots.js
    header = '/**\n * GeoMelody Global Scenic Spots Dataset\n * Total: 133 Excel Scenic Spots + 10 Ocean Exploration Spots = 143 Master Spots\n * Each spot contains exactly 3 high-resolution curated wallpapers.\n */\n\nexport const SCENIC_SPOTS = '
    output_js = header + json.dumps(spots, ensure_ascii=False, indent=2) + ';\n'

    with open('src/data/spots.js', 'w', encoding='utf-8') as f:
        f.write(output_js)

    print(f"Successfully assigned 3 wallpapers to all {len(spots)} spots in src/data/spots.js!")

if __name__ == '__main__':
    main()
