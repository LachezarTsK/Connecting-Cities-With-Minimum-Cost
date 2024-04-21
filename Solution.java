
import java.util.Arrays;

public class Solution {

    private static final int NOT_POSSIBLE_TO_CONNECT_ALL_CITIES = -1;

    public int minimumCost(int numberOfCities, int[][] connections) {
        return connectCitiesWithKruskalsAlgorithm(numberOfCities, connections);
    }

    private int connectCitiesWithKruskalsAlgorithm(int numberOfCities, int[][] connections) {
        UnionFind unionFind = new UnionFind(numberOfCities);

        Arrays.sort(connections, (x, y) -> x[2] - y[2]);
        int numberOfConnectedCities = 1;
        int totalCostToConnectAllCities = 0;

        for (int[] connection : connections) {
            int parentFirst = unionFind.findParent(connection[0]);
            int parentSecond = unionFind.findParent(connection[1]);
            int cost = connection[2];

            if (parentFirst != parentSecond) {
                ++numberOfConnectedCities;
                totalCostToConnectAllCities += cost;
                unionFind.joinByRank(parentFirst, parentSecond);
            }
            if (numberOfConnectedCities == numberOfCities) {
                break;
            }
        }
        return numberOfConnectedCities == numberOfCities
                ? totalCostToConnectAllCities
                : NOT_POSSIBLE_TO_CONNECT_ALL_CITIES;
    }
}

class UnionFind {

    int[] parent;
    int[] rank;

    UnionFind(int numberOfCities) {
        parent = new int[numberOfCities + 1];
        rank = new int[numberOfCities + 1];

        // 1 <= city ID <= numberOfCities
        for (int i = 1; i <= numberOfCities; ++i) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    void joinByRank(int first, int second) {
        if (rank[first] >= rank[second]) {
            parent[second] = parent[first];
            rank[first] += rank[second];
        } else {
            parent[first] = parent[second];
            rank[second] += rank[first];
        }
    }
}
