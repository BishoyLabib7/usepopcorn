import { useState } from "react";
import PropTypes from "prop-types";

const ratingcontainer = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};
const starcontainer = {
  display: "flex",
  gap: "4px",
};
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  setselectRate: PropTypes.func,
  message: PropTypes.array,
};

export default function StarRating({
  maxRating = 5,
  color = "black",
  size = 40,
  className,
  message = [],
  defaultRating = 0,
  getRating,
}) {
  const text = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${Number(size) / 1.5}px`,
  };

  const [rate, setRate] = useState(Number(defaultRating));
  const [selectRate, setselectRate] = useState(0);

  function handelRate(rate) {
    setRate(rate);
    getRating(rate);
  }
  function handelTempleRate(rate) {
    setselectRate(rate);
  }

  return (
    <div style={ratingcontainer} className={className}>
      <div style={starcontainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handelRate(i + 1)}
            onHover={() => handelTempleRate(i + 1)}
            onLeave={() => handelTempleRate(0)}
            full={selectRate ? selectRate >= i + 1 : rate >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={text}>
        {message.length === maxRating
          ? message[selectRate ? selectRate - 1 : rate - 1]
          : selectRate || rate || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHover, onLeave, color, size }) {
  const star = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={star}
      onClick={onRate}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {full ? (
        // full
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        // empty
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
