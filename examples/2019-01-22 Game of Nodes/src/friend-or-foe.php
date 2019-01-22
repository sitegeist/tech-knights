<?php
require_once __DIR__ . '/connection.php';

echo PHP_EOL;
echo 'Friend or foe?' . PHP_EOL;
echo '###########################' . PHP_EOL;
echo PHP_EOL;
echo 'Enter the names of two people and find out whether' . PHP_EOL;
echo 'they are supposed to be friends or enemies.';
echo PHP_EOL;
echo PHP_EOL;


$name1 = readline('Name of Person #1 (Eddard Stark): ') ?: 'Eddard Stark';
$name2 = readline('Name of Person #2 (Tywin Lannister): ') ?: 'Tywin Lannister';

echo PHP_EOL;
echo PHP_EOL;

$query = '
    MATCH p=shortestPath((p1:Person {name: {name1}})-[*]-(p2:Person {name: {name2}}))
    RETURN p1, relationships(p), p2
';

$result = $client->run($query, [
    'name1' => $name1,
    'name2' => $name2
]);

foreach ($result->getRecords() as $record) {
    $members = 0;

    foreach ($record->value('relationships(p)') as $relationship) {
        switch ($relationship->type()) {
            case 'ENEMIES_WITH':
                echo sprintf('%s and %s are enemies.', $name1, $name2) . PHP_EOL . PHP_EOL;
                exit;

            case 'FRIENDS_WITH':
            case 'ALLIES_WITH':
                echo sprintf('%s and %s are friends.', $name1, $name2) . PHP_EOL . PHP_EOL;
                exit;

            case 'MEMBER_OF':
                $members++;
                break;
        }
    }

    if ($members === 2) {
        echo sprintf('%s and %s are family.', $name1, $name2) . PHP_EOL . PHP_EOL;
    } else {
        echo sprintf('%s and %s have no relationship.', $name1, $name2) . PHP_EOL . PHP_EOL;
    }
}
