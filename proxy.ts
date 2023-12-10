

interface GamePlayer {
  id: number;
  name: string;
  level: number;
  // Other player data properties
}

interface PlayerDataService {
  getPlayerData(playerId: number): GamePlayer;
}

class RealPlayerDataService implements PlayerDataService {
  getPlayerData(playerId: number): GamePlayer {
    // Simulate fetching player data from a database
    console.log(`Fetching data for player ${playerId} from the database...`);
    // For simplicity, we'll create a dummy player object
    return { id: playerId, name: `Player${playerId}`, level: Math.floor(Math.random() * 100) };
  }
}

class PlayerDataProxy implements PlayerDataService {
  private realPlayerDataService: RealPlayerDataService;
  private cache: Map<number, GamePlayer>;

  constructor(realPlayerDataService: RealPlayerDataService) {
    this.realPlayerDataService = realPlayerDataService;
    this.cache = new Map<number, GamePlayer>();
  }

  getPlayerData(playerId: number): GamePlayer {
    // Check if player data is in the cache
    const cachedPlayer = this.cache.get(playerId);

    if (cachedPlayer) {
      console.log(`Returning cached data for player ${playerId}`);
      return cachedPlayer;
    }

    // If not in the cache, fetch data from the real service
    const realPlayerData = this.realPlayerDataService.getPlayerData(playerId);

    // Cache the fetched data for future use
    this.cache.set(playerId, realPlayerData);

    return realPlayerData;
  }
}

// Usage example
const realPlayerDataService = new RealPlayerDataService();
const playerDataProxy = new PlayerDataProxy(realPlayerDataService);

// First call, data is fetched from the real service
const player1 = playerDataProxy.getPlayerData(1);
console.log(player1);

// Subsequent call with the same player ID, data is returned from the cache
const player1Cached = playerDataProxy.getPlayerData(1);
console.log(player1Cached);

// Another player, data is fetched from the real service
const player2 = playerDataProxy.getPlayerData(2);
console.log(player2);

// Subsequent call with the same player ID, data is returned from the cache
const player2Cached = playerDataProxy.getPlayerData(2);
console.log(player2Cached);
