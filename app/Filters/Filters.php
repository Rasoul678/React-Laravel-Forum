<?php


namespace App\Filters;


abstract class Filters
{
    protected $builder;

    protected $filters = [];

    public function apply($builder)
    {
        $this->builder = $builder;

        foreach ($this->getFilters() as $filter => $value)
        {
            if(method_exists($this, $filter))
            {
                $this->$filter($value);
            }
        }

        return $builder;
    }

    /**
     * @return array
     */
    protected function getFilters(): array
    {
        return request()->only($this->filters);
    }
}
