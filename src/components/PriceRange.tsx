import * as React from "react";
import { Direction, Range, getTrackBackground } from "react-range";

const STEP = 10;
const MIN = 0;
const MAX = 1000;
const PriceRange: React.FC = ({ query, setQuery }) => {
  const [values, setValues] = React.useState([query.priceMin, query.priceMax]);
  return (
    <div
      className="range"
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => {
          setValues(values);
          const newQuery = { ...query };

          newQuery.priceMin = values[0];
          newQuery.priceMax = values[1];
          setQuery(newQuery);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#007782", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              position: "absolute",
              top: "15px",
              height: "20px",
              width: "20px",
              borderRadius: "99px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#007782",
              }}
            >
              {values[index] + "€"}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default PriceRange;
