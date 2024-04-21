
function minimumCost(numberOfCities: number, connections: number[][]): number {
    this.NOT_POSSIBLE_TO_CONNECT_ALL_CITIES = -1;
    return connectCitiesWithKruskalsAlgorithm(numberOfCities, connections);
};

function connectCitiesWithKruskalsAlgorithm(numberOfCities: number, connections: number[][]): number {
    const unionFind = new UnionFind(numberOfCities);

    connections.sort((x, y) => x[2] - y[2]);
    let numberOfConnectedCities = 1;
    let totalCostToConnectAllCities = 0;

    for (let connection of connections) {
        const parentFirst = unionFind.findParent(connection[0]);
        const parentSecond = unionFind.findParent(connection[1]);
        const cost = connection[2];

        if (parentFirst !== parentSecond) {
            ++numberOfConnectedCities;
            totalCostToConnectAllCities += cost;
            unionFind.joinByRank(parentFirst, parentSecond);
        }
        if (numberOfConnectedCities === numberOfCities) {
            break;
        }
    }
    return numberOfConnectedCities === numberOfCities
        ? totalCostToConnectAllCities
        : this.NOT_POSSIBLE_TO_CONNECT_ALL_CITIES;
}

class UnionFind {

    parent: number[];
    rank: number[];

    constructor(numberOfCities: number) {
        this.parent = new Array(numberOfCities + 1);
        this.rank = new Array(numberOfCities + 1);

        // 1 <= city ID <= numberOfCities
        for (let i = 1; i <= numberOfCities; ++i) {
            this.parent[i] = i;
            this.rank[i] = 1;
        }
    }

    findParent(index: number): number {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    joinByRank(first: number, second: number): void {
        if (this.rank[first] >= this.rank[second]) {
            this.parent[second] = this.parent[first];
            this.rank[first] += this.rank[second];
        } else {
            this.parent[first] = this.parent[second];
            this.rank[second] += this.rank[first];
        }
    }
}
