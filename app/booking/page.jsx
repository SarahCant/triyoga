export default async function Booking() {
  const response = await fetch(
    "https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams.json"
  ); // fetch data from Firebase

  const dataObject = await response.json(); //convert response to JSON object
  //console.log(dataObject);

  const teams = Object.keys(dataObject).map((key) => {
    return {
      id: key,
      ...dataObject[key],
    };
  });

  //console.log(teams);

  return (
    <main>
      <h1>booking</h1>
      {/*      <ol>
        {teams.map((team) => {
          return <li key={team.id}>{team.name}</li>;
        })}
      </ol> */}
    </main>
  );
}
