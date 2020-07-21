<?php

use App\Channel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $channels = ['Laravel', 'React', 'JavaScript', 'PHP', 'HTML', 'CSS', 'Python'];

        foreach ($channels as $channel)
        {
            factory(Channel::class)->create([
                'name'=>$channel,
                'slug'=>Str::lower($channel)
            ]);
        }
    }
}
