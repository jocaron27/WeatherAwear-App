const clothes = {
    umbrella: {
        name: 'umbrella',
        icon: require('../assets/clothes/umbrella.png')
    }, 
    rainboots: {
        name: 'rainboots',
        icon: require('../assets/clothes/rainboots.png')
    }, 
    raincoat: {
        name: 'raincoat',
        icon: require('../assets/clothes/raincoat.png')
    }, 
    sunglasses: {
        name: 'sunglasses',
        icon: require('../assets/clothes/sunglasses.png')
    }, 
    thickjacket: {
        name: 'thick jacket',
        icon: require('../assets/clothes/thickjacket.png')
    }, 
    mediumjacket: {
        name: 'medium jacket',
        icon: require('../assets/clothes/mediumjacket.png')
    }, 
    lightjacket: {
        name: 'light jacket',
        icon: require('../assets/clothes/lightjacket.png')
    }, 
    sweater: {
        name: 'sweater',
        icon: require('../assets/clothes/sweater.png')
    }, 
    longpants: {
        name: 'long pants',
        icon: require('../assets/clothes/longpants.png')
    }, 
    shorts: {
        name: 'shorts',
        icon: require('../assets/clothes/shorts.png')
    },
    skirt: {
        name: 'skirt',
        icon: require('../assets/clothes/skirt.png')
    },
    gloves: {
        name: 'gloves',
        icon: require('../assets/clothes/gloves.png')
    },
    hat: {
        name: 'hat',
        icon: require('../assets/clothes/hat.png')
    }, 
    tshirt: {
        name: 't-shirt',
        icon: require('../assets/clothes/tshirt.png')
    },
    sleevelessshirt: {
        name: 'sleeveless shirt',
        icon: require('../assets/clothes/sleeveless.png')
    }, 
    sandals: {
        name: 'sandals',
        icon: require('../assets/clothes/sandals.png')
    }, 
    dress: {
        name: 'dress',
        icon: require('../assets/clothes/dress.png')
    }, 
    scarf: {
        name: 'scarf',
        icon: require('../assets/clothes/scarf.png')
    },
    snowboots: {
        name: 'snow boots',
        icon: require('../assets/clothes/rainboots.png')
    }
};

const PRECIP = {
    snow: [clothes.snowboots],
    rain: [clothes.raincoat, clothes.rainboots, clothes.umbrella]
}

const TEMP = {
    AVG: {
        frigid: [clothes.sweater, clothes.thickjacket, clothes.longpants, clothes.hat, clothes.scarf, clothes.gloves], // 20-34
        freezing: [clothes.sweater, clothes.thickjacket, clothes.longpants, clothes.hat, clothes.scarf], // 35-42
        cold: [clothes.sweater, clothes.mediumjacket, clothes.longpants, clothes.scarf], // 43-49
        chilly: [clothes.sweater, clothes.mediumjacket, clothes.longpants], // 50-59
        mild: [clothes.tshirt, clothes.lightjacket, clothes.longpants],  // 60-69
        comfortable: [clothes.tshirt, clothes.longpants, clothes.shorts], // 70-74
        warm: [clothes.tshirt, clothes.shorts, clothes.skirt, clothes.dress, clothes.sandals], // 75-79
        hot: [clothes.sleevelessshirt, clothes.tshirt, clothes.shorts, clothes.skirt, clothes.dress, clothes.sandals] // 80+
    },
    COLD: {
        frigid: [clothes.sweater, clothes.thickjacket, clothes.longpants, clothes.hat, clothes.scarf, clothes.gloves], // 20-34
        freezing: [clothes.sweater, clothes.thickjacket, clothes.longpants, clothes.hat, clothes.scarf, clothes.gloves], // 35-42
        cold: [clothes.sweater, clothes.thickjacket, clothes.longpants, clothes.hat, clothes.scarf], // 43-49
        chilly: [clothes.sweater, clothes.mediumjacket, clothes.longpants], // 50-59
        mild: [clothes.tshirt, clothes.lightjacket, clothes.longpants],  // 60-69
        comfortable: [clothes.tshirt, clothes.lightjacket, clothes.longpants], // 70-74
        warm: [clothes.tshirt, clothes.shorts, clothes.skirt, clothes.dress, clothes.sandals], // 75-79
        hot: [clothes.sleevelessshirt, clothes.tshirt, clothes.shorts, clothes.skirt, clothes.dress, clothes.sandals] // 80+
    },
    HOT: {
        frigid: [clothes.sweater, clothes.thickjacket, clothes.longpants, clothes.hat, clothes.scarf, clothes.gloves], // 20-34
        freezing: [clothes.sweater, clothes.mediumjacket, clothes.longpants, clothes.hat, clothes.scarf], // 35-42
        cold: [clothes.sweater, clothes.mediumjacket, clothes.longpants], // 43-49
        chilly: [clothes.sweater, clothes.lightjacket, clothes.longpants], // 50-59
        mild: [clothes.tshirt, clothes.lightjacket, clothes.shorts, clothes.longpants],  // 60-69
        comfortable: [clothes.tshirt, clothes.shorts, clothes.sandals], // 70-74
        warm: [clothes.sleevelessshirt, clothes.tshirt, clothes.shorts, clothes.skirt, clothes.dress, clothes.sandals], // 75-79
        hot: [clothes.sleevelessshirt, clothes.tshirt, clothes.shorts, clothes.skirt, clothes.dress, clothes.sandals] // 80+
    } 
}

export const ALL_WEARABLES = [
    clothes.thickjacket,
    clothes.mediumjacket,
    clothes.lightjacket,
    clothes.raincoat, 
    clothes.sweater,
    clothes.tshirt,
    clothes.sleevelessshirt,
    clothes.longpants,
    clothes.shorts,
    clothes.skirt,
    clothes.dress,
    clothes.snowboots,
    clothes.rainboots,
    clothes.sandals,
    clothes.hat,
    clothes.scarf,
    clothes.gloves,
    clothes.umbrella,
    clothes.sunglasses,
];

export const getWearables = (day, config = 'AVG') => {
    if (!day) return [];
    const { temp, precip, precipType, summary } = day;
    let wearables = [];

    if (temp < 35) wearables = wearables.concat(TEMP[config].frigid);
    else if (temp < 43) wearables = wearables.concat(TEMP[config].freezing)
    else if (temp < 50) wearables = wearables.concat(TEMP[config].cold)
    else if (temp < 60) wearables = wearables.concat(TEMP[config].chilly)
    else if (temp < 70) wearables = wearables.concat(TEMP[config].mild)
    else if (temp < 75) wearables = wearables.concat(TEMP[config].comfortable)
    else if (temp < 80) wearables = wearables.concat(TEMP[config].warm)
    else if (temp >= 80) wearables = wearables.concat(TEMP[config].hot)

    
    if (precip > 20) wearables = wearables.concat(PRECIP[precipType])

    if (precip === 0 && summary.includes('sun')) wearables.push(clothes.sunglasses);

    return wearables;
}