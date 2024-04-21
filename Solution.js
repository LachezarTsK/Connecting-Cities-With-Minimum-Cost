
/**
 * @param {number} numberOfCities
 * @param {number[][]} connections
 * @return {number}
 */
var minimumCost = function (numberOfCities, connections) {
    this.NOT_POSSIBLE_TO_CONNECT_ALL_CITIES = -1;
    return connectCitiesWithKruskalsAlgorithm(numberOfCities, connections);
};

/**
 * @param {number} numberOfCities
 * @param {number[][]} connections
 * @return {number}
 */
function connectCitiesWithKruskalsAlgorithm(numberOfCities, connections) {
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

    /**
     * @param {number} numberOfCities
     */
    constructor(numberOfCities) {
        this.parent = new Array(numberOfCities + 1);
        this.rank = new Array(numberOfCities + 1);

        // 1 <= city ID <= numberOfCities
        for (let i = 1; i <= numberOfCities; ++i) {
            this.parent[i] = i;
            this.rank[i] = 1;
        }
    }

    /**
     * @param {number} index
     * @return {number}
     */
    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    /**
     * @param {number} first
     * @param {number} second
     * @return {void}
     */
    joinByRank(first, second) {
        if (this.rank[first] >= this.rank[second]) {
            this.parent[second] = this.parent[first];
            this.rank[first] += this.rank[second];
        } else {
            this.parent[first] = this.parent[second];
            this.rank[second] += this.rank[first];
        }
    }
}
