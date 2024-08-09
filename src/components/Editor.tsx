export default function Page() {
    return (
        <div style={Container}>
            Editor
        </div>
    );
}

const Container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    background: 'black',
  }