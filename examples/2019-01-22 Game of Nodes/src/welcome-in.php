<?php
require_once __DIR__ . '/connection.php';

echo PHP_EOL;
echo 'Welcome in?' . PHP_EOL;
echo '###########################' . PHP_EOL;
echo PHP_EOL;
echo 'Enter the name of a person and a castle to find out' . PHP_EOL;
echo 'whether that person would be welcome in that castle.';
echo PHP_EOL;
echo PHP_EOL;

$person = readline('Name of a Person (Eddard Stark): ') ?: 'Eddard Stark';
$castle = readline('Name of Castle (Winterfell): ') ?: 'Winterfell';

echo PHP_EOL;
echo PHP_EOL;

$query = '
    MATCH p=shortestPath((p1:Person {name: {person}})-[*]-(c1:Castle {name: {castle}}))
    RETURN p1, relationships(p), c1
';

$result = $client->run($query, [
    'person' => $person,
    'castle' => $castle
]);

foreach ($result->getRecords() as $record) {
    foreach ($record->value('relationships(p)') as $relationship) {
        if ($relationship->type() === 'ENEMIES_WITH') {
            echo sprintf('%s is not welcome at %s.', $person, $castle) . PHP_EOL . PHP_EOL;
            exit;
        }
    }
}

echo sprintf('%s is welcome at %s.', $person, $castle) . PHP_EOL . PHP_EOL;