<?php


namespace App\Traits;


use App\Activity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

trait Recordable
{
    protected static function bootRecordable()
    {
        foreach (static::getRecordEvents() as $event){
            static::$event(function ($model) use ($event) {
                $model->recordActivity($event);
            });
        }

        static::deleting(function ($model){
            $model->activities()->delete();
        });
    }

    public function activities()
    {
        return $this->morphMany(Activity::class, 'subject');
    }

    protected function recordActivity($event)
    {
        Activity::create([
            'user_id' => Auth::id(),
            'type' => $this->getActivityType($event),
            'subject_id'=>$this->id,
            'subject_type'=>get_class($this)
        ]);
    }

    protected function getActivityType($event)
    {
        $type = Str::lower((new \ReflectionClass($this))->getShortName());

        return $event.'_'.$type;
    }

    protected static function getRecordEvents()
    {
        return ['created', 'updated'];
    }
}
