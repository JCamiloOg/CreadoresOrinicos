export default function Background() {
    return (
        <div className="stars">
            {
                Array.from({ length: 30 }).map((_, idx) => (
                    <div className="star" key={idx}></div>
                ))
            }

        </div>
    );
}