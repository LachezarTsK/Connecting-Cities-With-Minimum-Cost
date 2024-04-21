
using System;

public class Solution
{
    private static readonly int NOT_POSSIBLE_TO_CONNECT_ALL_CITIES = -1;

    public int MinimumCost(int numberOfCities, int[][] connections)
    {
        return ConnectCitiesWithKruskalsAlgorithm(numberOfCities, connections);
    }

    private int ConnectCitiesWithKruskalsAlgorithm(int numberOfCities, int[][] connections)
    {
        UnionFind unionFind = new UnionFind(numberOfCities);

        Array.Sort(connections, (x, y) => x[2] - y[2]);
        int numberOfConnectedCities = 1;
        int totalCostToConnectAllCities = 0;

        foreach (int[] connection in connections)
        {
            int parentFirst = unionFind.FindParent(connection[0]);
            int parentSecond = unionFind.FindParent(connection[1]);
            int cost = connection[2];

            if (parentFirst != parentSecond)
            {
                ++numberOfConnectedCities;
                totalCostToConnectAllCities += cost;
                unionFind.JoinByRank(parentFirst, parentSecond);
            }
            if (numberOfConnectedCities == numberOfCities)
            {
                break;
            }
        }
        return numberOfConnectedCities == numberOfCities
                ? totalCostToConnectAllCities
                : NOT_POSSIBLE_TO_CONNECT_ALL_CITIES;
    }
}

class UnionFind
{

    readonly int[] parent;
    readonly int[] rank;

    public UnionFind(int numberOfCities)
    {
        parent = new int[numberOfCities + 1];
        rank = new int[numberOfCities + 1];

        // 1 <= city ID <= numberOfCities
        for (int i = 1; i <= numberOfCities; ++i)
        {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int FindParent(int index)
    {
        if (parent[index] != index)
        {
            parent[index] = FindParent(parent[index]);
        }
        return parent[index];
    }

    public void JoinByRank(int first, int second)
    {
        if (rank[first] >= rank[second])
        {
            parent[second] = parent[first];
            rank[first] += rank[second];
        }
        else
        {
            parent[first] = parent[second];
            rank[second] += rank[first];
        }
    }
}
