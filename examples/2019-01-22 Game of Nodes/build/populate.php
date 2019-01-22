<?php
require_once __DIR__ . '/../vendor/autoload.php';

use GraphAware\Neo4j\Client\ClientBuilder;
use Symfony\Component\Yaml\Yaml;

$client = ClientBuilder::create()
    ->addConnection('bolt', 'bolt://neo4j:admin@neo4j:7687')->build();

################################################################################################

echo 'Adding houses...' . PHP_EOL;

$houses = Yaml::parseFile(__DIR__ . '/fixtures/houses.yaml');
$nodes = $client->stack();
$relations = $client->stack();

foreach ($houses as $id => $house) {
    $nodes->push('CREATE (n:House {house})', ['house' => [
        'uuid' => $id,
        'name' => $house['name']
    ]]);

    if (isset($house['friends-with'])) {
        foreach($house['friends-with'] as $rel) {
            $relations->push('MATCH (n1:House {uuid: {id1} }), (n2:House {uuid: {id2} }) MERGE (n1)-[:FRIENDS_WITH]-(n2)', [
                'id1' => $id,
                'id2' => $rel
            ]);
        }
    }

    if (isset($house['allies-with'])) {
        foreach($house['allies-with'] as $rel) {
            $relations->push('MATCH (n1:House {uuid: {id1} }), (n2:House {uuid: {id2} }) MERGE (n1)-[:ALLIES_WITH]-(n2)', [
                'id1' => $id,
                'id2' => $rel
            ]);
        }
    }

    if (isset($house['enemies-with'])) {
        foreach($house['enemies-with'] as $rel) {
            $relations->push('MATCH (n1:House {uuid: {id1} }), (n2:House {uuid: {id2} }) MERGE (n1)-[:ENEMIES_WITH]-(n2)', [
                'id1' => $id,
                'id2' => $rel
            ]);
        }
    }

    if (isset($house['sworn-to'])) {
        $relations->push('MATCH (n1:House {uuid: {id1} }), (n2:House {uuid: {id2} }) MERGE (n1)-[:SWORN_TO]-(n2)', [
            'id1' => $id,
            'id2' => $house['sworn-to']
        ]);
    }
}

$client->runStack($nodes);
$client->runStack($relations);

################################################################################################

echo 'Adding people...' . PHP_EOL;

$people = Yaml::parseFile(__DIR__ . '/fixtures/people.yaml');
$nodes = $client->stack();
$relations = $client->stack();

foreach ($people as $id => $person) {
    $nodes->push('CREATE (n:Person {person})', ['person' => [
        'uuid' => $id,
        'name' => $person['name']
    ]]);

    if (isset($person['member-of'])) {
        $relations->push('MATCH (n1:Person {uuid: {id1} }), (n2:House {uuid: {id2} }) MERGE (n1)-[:MEMBER_OF]-(n2)', [
            'id1' => $id,
            'id2' => $person['member-of']
        ]);
    }

    if (isset($person['enemies-with'])) {
        foreach($person['enemies-with'] as $rel) {
            $relations->push('MATCH (n1:Person {uuid: {id1} }), (n2:Person {uuid: {id2} }) MERGE (n1)-[:ENEMIES_WITH]-(n2)', [
                'id1' => $id,
                'id2' => $rel
            ]);
        }
    }
}

$client->runStack($nodes);
$client->runStack($relations);

################################################################################################

echo 'Adding castles...' . PHP_EOL;

$castles = Yaml::parseFile(__DIR__ . '/fixtures/castles.yaml');
$nodes = $client->stack();
$relations = $client->stack();

foreach ($castles as $id => $castle) {
    $nodes->push('CREATE (n:Castle {castle})', ['castle' => [
        'uuid' => $id,
        'name' => $castle['name']
    ]]);

    if (isset($castle['belongs-to'])) {
        $relations->push('MATCH (n1:Castle {uuid: {id1} }), (n2:House {uuid: {id2} }) MERGE (n1)-[:BELONGS_TO]-(n2)', [
            'id1' => $id,
            'id2' => $castle['belongs-to']
        ]);
    }
}

$client->runStack($nodes);
$client->runStack($relations);