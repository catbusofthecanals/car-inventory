import "./CarList.css";
import CarItem from "../CarItem/CarItem";

function CarList({ cars, fetchCars }) {
  return (
    <div className="cars-container">
      <div className="cars">
        {/* if cars is empty display message */}
        {cars === undefined ? (
          <div className="empty">
            Enter car details to display car inventory
          </div>
        ) : (
          <div className="car-items">
            {/* map through car items, oass data as props through Car Item component */}
            {cars &&
              cars.map((item) => (
                <CarItem item={item} key={item._id} fetchCars={fetchCars} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarList;
