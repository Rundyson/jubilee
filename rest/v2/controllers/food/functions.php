<?php
 
// Read all by category
function checkReadAllByCategoryId($object)
{
    $query = $object->readAllByCategoryId();
    checkQuery($query, "Empty records. (read All by category)");
    return $query;
}
//Read active
function checkFilterActive($object)
{
    $query = $object->filterFoodActive();
    checkQuery($query, "Empty records. (filter active)");
    return $query;
}

//Read active Search
function checkFilterActiveSearch($object)
{
    $query = $object->filterFoodActiveSearch();
    checkQuery($query, "Empty records. (filter active search)");
    return $query;
}
