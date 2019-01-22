<?php
require_once __DIR__ . '/connection.php';

echo PHP_EOL;
echo 'Enemies' . PHP_EOL;
echo '###########################' . PHP_EOL;
echo PHP_EOL;
echo 'Enter the name of a person in order to find out' . PHP_EOL;
echo 'who this person\'s enemies are.';
echo PHP_EOL;
echo PHP_EOL;

$person = readline('Name of a Person (Eddard Stark): ') ?: 'Eddard Stark';

echo PHP_EOL;
echo PHP_EOL;

$query = '
    MATCH path=allShortestPaths((p1:Person {name: {person}})-[*]-(p2:Person))
    WHERE NOT p1 = p2
    WITH p1, p2, collect(relationships(path)) as relationshipsOnShortestPaths
    WHERE ALL (
        closestRelationShips in relationshipsOnShortestPaths
        WHERE SINGLE (r in closestRelationShips WHERE type(r) = "ENEMIES_WITH")
    )
    RETURN DISTINCT p2
';

$result = $client->run($query, [
    'person' => $person
]);

foreach ($result->getRecords() as $record) {
    $enemy = $record->value('p2');
    echo $enemy->value('name') . PHP_EOL;
}