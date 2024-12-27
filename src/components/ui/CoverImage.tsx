import Image from 'next/image'
import { useState } from 'react'
import { cn } from 'utils/cn';

// Function to generate a random hex color
function getRandomDarkColor() {
    const darkColors = ['#003366', '#8B0000', '#006400', '#4B0082', '#654321', '#333333'];
    const randomIndex = Math.floor(Math.random() * darkColors.length);
    return darkColors[randomIndex];
}

// Define the types for the props
interface CoverImageProps {
    src: string;
    alt: string;
    userFirstName?: string;
    size?: string;
    rounded?: string;
    fontSize?: string
}

const CoverImage: React.FC<CoverImageProps> = ({
    src,
    alt,
    userFirstName,
    size = 'w-full h-32',
    rounded = 'rounded-lg',
    fontSize = 'text-lg'
}) => {
    const [bgColor] = useState<string>(getRandomDarkColor()); // Random background color
    return (
        <>
            {src ?
                <div className={`relative ${size} ${rounded} overflow-hidden flex items-center justify-center bg-gray-500`}>
                    <Image
                        src={src}
                        alt={alt}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                :
                <div className={`relative ${size} ${rounded} overflow-hidden flex items-center justify-center`} style={{ background: bgColor }}>
                    <p className={`absolute text-white font-bold ${fontSize} p-4`}>{userFirstName?.slice(0, 1).toUpperCase()}</p>
                </div>

            }

        </>
    );
};

export default CoverImage;
