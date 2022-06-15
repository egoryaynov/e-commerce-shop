import { ColorType } from "pages/Product/ProductPage"
import React from "react"
import styles from './ColorSelector.module.scss';

type SetColorType = React.Dispatch<React.SetStateAction<ColorType>>

const ColorSelector: React.FC<{ colors: ColorType[], setColor: SetColorType, color: ColorType }> = ({ colors, setColor, color: currentColor }) => {
    return (
        <div style={{ display: 'flex'}}>
            {colors.map(color => (
                <div key={color.name} className={styles.Item} onClick={() => setColor(color)}>
                    <div className={`${styles.Circle} ${currentColor.name === color.name ? styles.ActiveCircle : ''}`} style={{ backgroundColor: color.hex }} />
                    <div>{color.name}</div>
                </div>
            ))}
        </div>
    )
}

export default ColorSelector