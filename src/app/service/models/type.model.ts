// Interface tanımı
export interface Cpu {
    id: number;  
    brand: string;  
    clockSpeed: number;  
    socketType: string;  
    generation: string;  
    series: string;  
    coreCount: number;  
    model: string;  
    // Diğer özellikler...
}

export interface CpuCooler {
    id: number;
    type: string;
    fenLength: string;
    rpm: number;  
    material: string;  
    led: string;  
    brand: string;  
    model: string;  
    // Diğer özellikler...
}

export interface DesktopCase {
    id: number;  
    brand: string;  
    model: string;  
    type: string;  
    psu: boolean;  
    psuLocation: string;  
    transparent: boolean;  
    psuWatt: number;  
    // Diğer özellikler...
}


export interface Gpu {
    id: number;  
    brand: string;  
    producer: string;  
    series: string;  
    model: string;  
    vram: number;  
    memoryInterface: number;    
    // Diğer özellikler...
}


export interface Motherboard {
    id: number;  
    cpuSockeType: string;  
    cpuCompatibility: boolean;  
    ramType: string;  
    size: string;  
    ramSlots: number;  
    brand: string;
    model: string;    
    // Diğer özellikler...
}

export interface Psu {
    id: number;  
    watt: number;  
    effiency: string;  
    modular: boolean;  
    type: string;  
    pcieGen5Support: boolean;  
    brand: string;
    model: string;    
    // Diğer özellikler...
}

export interface Ram {
    id: number;  
    type: string;  
    capacity: number;  
    frequencySpeed: number;  
    channelType: string;  
    compatibility: string;  
    brand: string;
    model: string;    
    // Diğer özellikler...
}

// Interface tanımı
export interface GetCpu {
    typeId: number;  
    // Diğer özellikler...
}
