const TableColorColumn: React.FC<{ name: string, hex: string }> = ({ hex, name }) => {
    return (
        <span>{name}</span>
    )
}

export default TableColorColumn