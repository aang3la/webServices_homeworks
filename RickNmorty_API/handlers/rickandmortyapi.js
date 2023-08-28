//? - Преземање на податоци од RickN'Morty API-то и локално кеширање на податоците

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
let cache = {};

const fetchData = async (url) => {
    //! So ovoj if proveruvame dali e zastarena datata i posle kolku vreme da se brise datata
    if (
        //dali imame vo keshot kluc so toj broj
        cache[url] &&
        //dali vo objektot sto imame kluc i cache time ne e null
        cache[url].cacheTime !== null &&
        //ako ne e null i vremeto chacheTime e pomalo od segasnoto vreme za 60 sekundi, izbrisi gi podatocite
        cache[url].cacheTime + 60 * 1000 < new Date().getTime()
      ) {
        cache[url].localCache = null;
      }
    
      //! So ovoj if proveruvame dali vo cashot ja ima informacijata sto ja prebaruvame, ova se aktivira prv pat koga ke baras nekoj karakter, epizoda ili lokacija
      if (!cache[url] || cache[url].localCache === null) {
        let data = await fetch(url);
        cache[url] = {
          localCache: await data.json(),
          cacheTime: new Date().getTime()
        };
      }
    
      return cache[url].localCache;
};    

//* Get information about the characters
const getCharacter = async (req, res) => {
    const id = req.params.id;
    const url = `https://rickandmortyapi.com/api/character/${id}`

    try {
        const characterData = await fetchData(url);
        res.json(characterData);
    }catch(err){
        res.status(500).json(err);
    }  
};

//* Get information about the episodes
const getEpisode = async (req, res) => {
    const episodeId = req.params.episodeId;
    const url = `https://rickandmortyapi.com/api/episode/${episodeId}`;

    try {
        const episodeData = await fetchData(url);
        res.json(episodeData);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getLocation = async (req, res) => {
    const locationId = req.params.locationId;
    const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  
    try {
      const locationData = await fetchData(url);
      res.json(locationData);
    } catch (err) {
      res.status(500).json(err);
    }
};

module.exports = {
    getCharacter,
    getEpisode,
    getLocation
}


