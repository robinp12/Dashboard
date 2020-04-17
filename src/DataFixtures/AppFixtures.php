<?php

namespace App\DataFixtures;

use App\Entity\Hospital;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * Encodeur de Mot de passe
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;    
    }
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
       
        $user = new User();
        $hash = $this->encoder->encodePassword($user, "password");
        $user->setFirstName("Robin")
                ->setLastName("Paquet")
                ->setEmail("robipaq@hotmail.com")
                ->setPassword($hash)
                ->setRoles(["ADMIN"]);

        $manager->persist($user);
        
        for($e=0;$e<10;$e++){
            $user = new User();
            $user->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setEmail($faker->email())
                ->setPassword($hash);

            $manager->persist($user);
           
            $hospital = new Hospital();
            $hospital->setName("Hopital " . $faker->lastName())
                        ->setProvince($faker->randomElement(['Namur','Bruxelles','Liège']))
                        ->setUser($user);
            $manager->persist($hospital);
            
        }

        $manager->flush();
    }
}
