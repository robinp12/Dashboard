<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"province_read"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ProvinceRepository")
 * @UniqueEntity("name", message="Province déjà existante")
 */
class Province
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @Groups({"province_read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"province_read","hospital_read","users_read"})
     * @Assert\NotBlank(message="Nom obligatoire")
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Hospital", mappedBy="province")
     */
    private $hospitals;

    public function __construct()
    {
        $this->hospitals = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Hospital[]
     */
    public function getHospitals(): Collection
    {
        return $this->hospitals;
    }

    public function addHospital(Hospital $hospital): self
    {
        if (!$this->hospitals->contains($hospital)) {
            $this->hospitals[] = $hospital;
            $hospital->setProvince($this);
        }

        return $this;
    }

    public function removeHospital(Hospital $hospital): self
    {
        if ($this->hospitals->contains($hospital)) {
            $this->hospitals->removeElement($hospital);
            // set the owning side to null (unless already changed)
            if ($hospital->getProvince() === $this) {
                $hospital->setProvince(null);
            }
        }

        return $this;
    }
}
