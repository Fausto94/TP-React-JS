// En /componentes/ItemList/ItemList.jsx
import { Item } from "../Item/Item.jsx";

export function ItemList({ productos }) {
    return (
        <div style={{ display: 'flex', gap: '20px' , flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            {productos.map(prod => (
                <Item key={prod.id} {...prod} />
            ))}
        </div>
    );
}

export default ItemList;