
class Solution {

    companion object {
        const val NOT_POSSIBLE_TO_CONNECT_ALL_CITIES = -1;
    }

    fun minimumCost(numberOfCities: Int, connections: Array<IntArray>): Int {
        return connectCitiesWithKruskalsAlgorithm(numberOfCities, connections);
    }

    private fun connectCitiesWithKruskalsAlgorithm(numberOfCities: Int, connections: Array<IntArray>): Int {
        val unionFind = UnionFind(numberOfCities)

        connections.sortWith { x, y -> x[2] - y[2] }
        var numberOfConnectedCities = 1;
        var totalCostToConnectAllCities = 0;

        for (connection in connections) {
            val parentFirst = unionFind.findParent(connection[0]);
            val parentSecond = unionFind.findParent(connection[1]);
            val cost = connection[2];

            if (parentFirst != parentSecond) {
                ++numberOfConnectedCities;
                totalCostToConnectAllCities += cost;
                unionFind.joinByRank(parentFirst, parentSecond);
            }
            if (numberOfConnectedCities == numberOfCities) {
                break;
            }
        }
        return when (numberOfConnectedCities == numberOfCities) {
            true -> totalCostToConnectAllCities
            else -> NOT_POSSIBLE_TO_CONNECT_ALL_CITIES
        }
    }
}

class UnionFind(private val numberOfCities: Int) {

    val parent = IntArray(numberOfCities + 1)
    var rank = IntArray(numberOfCities + 1)

    init {
        // 1 <= city ID <= numberOfCities
        for (i in 1..numberOfCities) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    fun findParent(index: Int): Int {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    fun joinByRank(first: Int, second: Int) {
        if (rank[first] >= rank[second]) {
            parent[second] = parent[first];
            rank[first] += rank[second];
        } else {
            parent[first] = parent[second];
            rank[second] += rank[first];
        }
    }
}
