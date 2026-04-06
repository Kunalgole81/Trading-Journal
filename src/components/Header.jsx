import Button from 'devextreme-react/button'

export default function Header({ onToggle }) {
    return (
        <div
            style={{
                height: 56,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                background: '#1976d2',
                color: '#fff'
            }}
        >
            <Button
                icon="menu"
                stylingMode="text"
                onClick={onToggle}
            />
            <h3 style={{ margin: '0 0 0 12px' }}>
                Trading Journal
            </h3>
        </div>
    )
}
