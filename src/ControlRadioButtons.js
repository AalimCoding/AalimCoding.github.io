import RadioCardWeapons from "./RadioCardWeapons";
import { HStack, useRadioGroup } from "@chakra-ui/react";


// See https://chakra-ui.com/docs/components/radio for implementation details.
export function ControlRadioButtons({ setWeaponType, weaponType, whoseTurnIsIt, noOfGrid, Ammo }) {
    const options = [`Normal ∞`, `Large ${Ammo[noOfGrid][0]}`, `Scatter ${Ammo[noOfGrid][1]}`];

    const { getRootProps, getRadioProps } = useRadioGroup({
        defaultValue: `Normal ∞`,
        onChange: (value) => setWeaponType((prevTypes) => ({ ...prevTypes, [noOfGrid]: value })),
        value: weaponType[noOfGrid]
    });

    const group = getRootProps();

    return (
        <HStack {...group}>
            {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                    <RadioCardWeapons key={value} {...radio} 
                    
           

                    isDisabled={(!Ammo[noOfGrid][0] && value.includes('Large')) || (!Ammo[noOfGrid][1] && value.includes('Scatter')) || (whoseTurnIsIt !== noOfGrid)}>
                        {value}
                        
                    </RadioCardWeapons>
                );
            })}
        </HStack>
    );
}

